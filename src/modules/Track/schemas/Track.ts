import { gql } from "apollo-server";

export const Track = gql`
  type Track {
    id: ID!
    title: String!
    album: String
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  extend type Query {
    tracks(limit: Int, offset: Int): [Track!]
    track(id: ID!): Track
  }

  extend type Mutation {
    createTrack(
      title: String!
      albumId: String
      artistsIds: [String]
      bandsIds: [String]
      duration: Int
      released: Int
      genresIds: [String]
    ): Track
    updateTrack(
      id: ID!
      title: String!
      albumId: String
      artistsIds: [String]
      bandsIds: [String]
      duration: Int
      released: Int
      genresIds: [String]
    ): Track
    deleteTrack(id: ID!): Delete
  }
`;
