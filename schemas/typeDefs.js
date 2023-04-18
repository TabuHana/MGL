const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    gameCount: Int
    savedGames: [game]
  }

  type game {
    developer: String!
    freetogame_profile_url: String!
    game_url: String!
    genre: String!
    game_id: Int!
    platform: String!
    publisher: String!
    short_description: String!
    thumbnail: String!
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }


  input GameInput {
    developer: String!
    freetogame_profile_url: String!
    game_url: String!
    genre: String!
    game_id: Int!
    platform: String!
    publisher: String!
    short_description: String!
    thumbnail: String!
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGame(developer: String!, freetogame_profile_url: String!, game_url: String!, genre: String!, game_id: Int!, platform: String!, publisher: String!, short_description: String!,
    thumbnail: String!, title: String!): User
    removeGame(game_id: Int!): User
  }
`;

module.exports = typeDefs;
