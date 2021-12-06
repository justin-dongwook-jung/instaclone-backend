import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      {firstName, lastname, username, email, password}
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username: username
              },
              {
                email: email
              }
            ]
          }
        });

        if(existingUser){
          throw new Error("This username/password is already taken.");
        }

        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username: username,
            email: email,
            firstName: firstName,
            lastname: lastname,
            password: uglyPassword
          }
        });
        return {
          ok: true
        }
      } catch (e) {
        return {
          ok: false,
          error: "Can not create account."
        }
      }
    }
  }
}
