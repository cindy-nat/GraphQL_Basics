import { gql } from "apollo-server";

export const Band = gql`
  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Member {
    artist: String
    instrument: String
    years: [String]
  }
  input MemberInput {
    artist: String
    instrument: String
    years: [String]
  }

  extend type Query {
    bands(limit: Int, offset: Int): [Band!]
    band(id: ID!): Band
  }

  extend type Mutation {
    createBand(
      name: String!
      origin: String
      members: [MemberInput]
      website: String
      genresIds: [String]
    ): Band
    updateBand(
      id: ID!
      name: String
      origin: String
      members: [MemberInput]
      website: String
      genresIds: [String]
    ): Band
    deleteBand(id: ID!): Delete
  }
`;
