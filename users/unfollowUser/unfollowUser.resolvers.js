import {protectedResolver} from "../users.utils";
import client from "../../client";

export default {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({where: { username }});
      if(!ok){
        return {
          ok: false,
          error: "Can't unfollow user."
        }
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            disconnect: {
              username: username
            }
          }
        }
      });

      return {
        ok: true
      }
    })
  }
}
