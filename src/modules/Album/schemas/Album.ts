import { gql } from "apollo-server";

export const Album = gql`
  type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  extend type Query {
    albums(limit: Int, offset: Int): [Album!]
    album(id: ID!): Album
  }

  extend type Mutation {
    createAlbum(
      name: String!
      released: Int
      artistsIds: [String]
      bandsIds: [String]
      trackIds: [String]
      genresIds: [String]
      image: String
    ): Album
    updateAlbum(
      id: ID!
      name: String
      released: Int
      artistsIds: [String]
      bandsIds: [String]
      trackIds: [String]
      genresIds: [String]
      image: String
    ): Album
    deleteAlbum(id: ID!): Delete
  }
`;
