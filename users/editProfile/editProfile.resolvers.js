import client from "../../client";
import bcrypt from "bcrypt";
import {protectedResolver} from "../users.utils";
import {GraphQLUpload} from "graphql-upload";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(async (_, {firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser } ) => {
      const { filename, createReadStream } = await avatar;
      const stream = createReadStream();

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
          ...(uglyPassword && {password: uglyPassword})
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
