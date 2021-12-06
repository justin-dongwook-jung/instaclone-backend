import client from "../../client";
import bcrypt from "bcrypt";
import {protectedResolver} from "../users.utils";
import {GraphQLUpload} from "graphql-upload";
import { createWriteStream } from "fs";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(async (_, {firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser } ) => {
      let avatarUrl = null;
      if(avatar){
        const { filename, createReadStream } = await avatar;
        const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFileName);
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFileName}`;
      }


      let uglyPassword = null;
      if (newPassword) uglyPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await client.user.update({
        where: {
          id: loggedInUser.id
        }, data: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          bio: bio,
          ...(uglyPassword && {password: uglyPassword}),
          ...(avatarUrl && {avatar: avatarUrl})
        }
      })

      if(updatedUser.id){
        return {
          ok: true
        }
      }
      else {
        return {
          ok: false,
          error: "Could not edit profile"
        }
      }
    })
  }
}
