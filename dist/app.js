"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const users_1 = require("./resolvers/users");
const profiles_1 = require("./resolvers/profiles");
const typeDefs = apollo_server_1.gql `
  type Query {
    users: [User]
    profiles: [Profile]
    profile(id: ID!): Profile
    user(id: ID!): User 
  }
  type User {
    name: String
    email: String
    profile: Profile
  }
  type Profile {
    city: String
    avatar: String
    about: String
    contacts: [Profile]
    user: User
  }
`;
const resolvers = {
    Query: {
        users: (root, args, context) => {
            return users_1.getUsers();
        },
        user: (root, args, context) => {
            return users_1.getUser(args);
        },
        profiles: (root, args, context) => {
            return profiles_1.getProfiles();
        },
        profile: (root, args, context) => {
            return profiles_1.getProfile(args);
        }
    },
    User: {
        profile: (user, args, context) => {
            return profiles_1.getProfile(user);
        }
    },
    Profile: {
        user: (profile, args, context) => {
            return users_1.getUser(profile);
        }
    }
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    tracing: true
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
