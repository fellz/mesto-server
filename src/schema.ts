import { gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  
  type Query {
    profiles: [Profile]
    profile(uid: ID!): Profile
  }
  
  type Contact {
    uid: ID
    contact_id: ID
    fullname: String
  }
  
  type User {
    uid: ID
    email: String
    profile: Profile
  }
  
  type Profile {
    id: ID
    uid: ID!
    city: String
    fullname: String
    avatar: Avatar
    about: String
    user_id: ID
    contacts: [Contact]
  }
  
  type Avatar {
    url: String
    profile_id: String
  }
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  
  input ProfileInput {
    "city user live in"
    city: String,
    "fullname like Pablo Escobar"
    fullname: String,
    "About text"
    about: String,
    "User who ownes this profile"
    user_id: String!
  }
  input ProfileUpdate {
    "city user live in"
    city: String,
    "fullname like Pablo Escobar"
    fullname: String,
    "About text"
    about: String,
    "UID of profile that needs update"
    uid: String!
  }
  
  type ProfileCreatePayload{
    uid: ID
  }
  type ProfileUpdatePayload{
    uid: ID
  }
  type UserPayload{
    uid: ID
  }
  input UserInput{
    email: String
    password: String
  }
  type Mutation{
    createProfile( profile: ProfileInput ): ProfileCreatePayload
    updateProfile( profile: ProfileUpdate ): ProfileUpdatePayload
    createUser(user: UserInput): UserPayload
    loginUser(user: UserInput): UserPayload 
    singleImageUpload(file: Upload!, id: ID): Avatar
  }
`;