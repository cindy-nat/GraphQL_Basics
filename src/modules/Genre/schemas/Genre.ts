import { gql } from "apollo-server";

export const Genre = gql`
  type Genre {
    _id: ID!
    name: String
    description: String
    country: String
    year: Int
  }
  extend type Query {
    genres(limit: Int, offset: Int): [Genre!]
    genre(id: ID!): Genre
  }
  extend type Mutation {
    createGenre(
      name: String!
      description: String
      country: String
      year: Int
    ): Genre
    updateGenre(
      id: ID!
      name: String
      description: String
      country: String
      year: Int
    ): Genre
    deleteGenre(id: ID!): Delete
  }
`;
