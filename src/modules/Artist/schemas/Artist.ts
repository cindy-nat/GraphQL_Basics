import { gql } from "apollo-server";

export const Artist = gql`
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
  }

  extend type Query {
    artistes(limit: Int, offset: Int): [Artist!]
    artist(id: ID!): Artist
  }

  extend type Mutation {
    createArtist(
      firstName: String!
      secondName: String!
      middleName: String
      birthDate: String
      birthPlace: String
      country: String
      bandsIds: [String]
      instruments: [String]
    ): Artist
    updateArtist(
      id: ID!
      firstName: String
      secondName: String
      middleName: String
      birthDate: String
      birthPlace: String
      country: String
      bandsIds: [String]
      instruments: [String]
    ): Artist
    deleteArtist(id: ID!): Delete
  }
`;
