import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      {firstName, lastname, username, email, password}
    ) => {
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
      console.log(existingUser);

      const uglyPassword = await bcrypt.hash(password, 10);
      return await client.user.create({
        data: {
          username: username,
          email: email,
          firstName: firstName,
          lastname: lastname,
          password: uglyPassword
        }
      });
    }
  }
}
