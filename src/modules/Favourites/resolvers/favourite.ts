export const favourite = {
  Query: {
    favourites: async (_source, { limit, offset }, { dataSources }) =>
      dataSources.favouriteAPI.getFavourites(limit, offset),
  },
  Favourites: {
    id: (parent) => parent._id,
    artists: (parent, _, { dataSources }) => {
      const artists = [];
      parent.artistsIds.forEach((artistId) =>
        artists.push(dataSources.artistAPI.getArtist(artistId))
      );
      const result = Promise.all(artists);
      return result;
    },
    genres: (parent, _, { dataSources }) => {
      const genres = [];
      parent.genresIds.forEach((genreId) =>
        genres.push(dataSources.genresAPI.getGenre(genreId))
      );
      const result = Promise.all(genres);
      return result;
    },
    bands: (parent, _, { dataSources }) => {
      const bands = [];
      parent.bandsIds.forEach((bandId) =>
        bands.push(dataSources.bandAPI.getBand(bandId))
      );
      const result = Promise.all(bands);
      return result;
    },
    tracks: (parent, _, { dataSources }) => {
      const tracks = [];
      parent.tracksIds.forEach((trackId) =>
        tracks.push(dataSources.trackAPI.getTrack(trackId))
      );
      const result = Promise.all(tracks);
      return result;
    },
  },
  Mutation: {
    addTrackToFavourites: async (_source, { tracksId }, { dataSources }) =>
      dataSources.favouriteAPI.addTrackToFavourites(tracksId),
    addBandToFavourites: async (_source, { bandsId }, { dataSources }) =>
      dataSources.favouriteAPI.addBandToFavourites(bandsId),
    addArtistToFavourites: async (_source, { artistsId }, { dataSources }) =>
      dataSources.favouriteAPI.addArtistToFavourites(artistsId),
    addGenreToFavourites: async (_source, { genresId }, { dataSources }) =>
      dataSources.favouriteAPI.addGenreToFavourites(genresId),
  },
};
