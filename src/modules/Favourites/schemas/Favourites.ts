import { gql } from "apollo-server";

export const Favourites = gql`
  type Favourites {
    id: ID!
    userId: ID
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }

  extend type Query {
    favourites(limit: Int, offset: Int): Favourites
  }

  extend type Mutation {
    addTrackToFavourites(tracksId: String): Favourites
    addBandToFavourites(bandsId: String): Favourites
    addArtistToFavourites(artistsId: String): Favourites
    addGenreToFavourites(genresId: String): Favourites
  }
`;
