import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, aption }, { loggedInUser }) => {
          if(caption){
            
          }
      }
    )
  }
};
