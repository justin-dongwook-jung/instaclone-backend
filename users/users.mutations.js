import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        return await client.user.create({
          data: {
            username: username,
            email: email,
            firstName: firstName,
            lastname: lastname,
            password: uglyPassword
          }
        });
      } catch (e) {
        return e;
      }
    },
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: {username} });
      if(!user){
        return {
          ok: false,
          error: "user not found."
        }
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if(!passwordOk){
        return {
          ok: false,
          error: "incorrect password."
        }
      }

      const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
      return {
        ok: true,
        token: token
      }

    }
  }
}
