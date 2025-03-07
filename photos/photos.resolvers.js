import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id: id
            }
          }
        }
      });
    },
    likes: ({ id }) => {
      return client.like.count({
        where: {
          photoId: id
        }
      });
    }
  },
  Hashtag: {
    photos: ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: {
            id: id
          }
        })
        .photos();
    },
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id: id
            }
          }
        }
      })
  }
};
