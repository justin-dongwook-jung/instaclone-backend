import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];

        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = hashtags.map((item) => ({
            where: { hashtag: item },
            create: { hashtag: item }
          }));
        }

        return client.photo.create({
          data: {
            file: file,
            caption: caption,
            user: {
              connect: {
                id: loggedInUser.id
              }
            },
            ...(hashtagObj.length > 0 && {
              hashtags: { connectOrCreate: hashtagObj }
            })
          }
        });
      }
    )
  }
};
