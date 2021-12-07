import {gql} from "apollo-server";

export default gql`
    type User{
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        following: [User]
        followers: [User]
        createAt: String!
        updatedAt: String!
        totalFollowing: Int!
        totalFollowers: Int!
#        isFollowing: Boolean!
#        isMe: Boolean!
    } 
`
