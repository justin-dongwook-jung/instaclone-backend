export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((item) => ({
    where: { hashtag: item },
    create: { hashtag: item }
  }));
};
