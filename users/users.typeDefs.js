import {gql} from "apollo-server";

export default gql`
    type User{
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        photos: [Photo]
        following: [User]
        followers: [User]
        createAt: String!
        updatedAt: String!
        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
    }                                                                                                               
`
