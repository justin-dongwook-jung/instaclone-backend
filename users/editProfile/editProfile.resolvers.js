import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (_, {fistName, lastName, username, email, password: newPassword}) => {
      let uglyPassword = null;
      if (newPassword) uglyPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await client.user.update({
        where: {
          id: 1
        }, data: {
          fistName, lastName, username, email, ...(uglyPassword && {password: uglyPassword})
        }
      })

      console.log(updatedUser)

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
    }
  }
}
