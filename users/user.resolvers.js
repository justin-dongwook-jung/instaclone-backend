export default {
  User: {
    totalFollowing: (root) => {
      return root.following.length;
    },
    totalFollowers: (root) => {
      return root.followers.length;
    }
  }
}
