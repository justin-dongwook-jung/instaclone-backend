import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
          if(caption){
            const hashtag = caption.match(/#[\w]+/g);
            console.log(hashtag);
          }
          client.photo.create({
            data: {
              file: file,
              caption: caption,
              hashtags: {
                connectOrCreate: [
                  {
                    where: {
                      hashtag: "#food"
                    },
                    create: {
                      hashtag: "#food"
                    }
                  }
                ]
              }
            }
          })
      }
    )
  }
};
