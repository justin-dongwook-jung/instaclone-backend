import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      {firstName, username, email, password}
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
    }
  }
}
