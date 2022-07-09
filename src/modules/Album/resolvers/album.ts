export const album = {
  Query: {
    albums: async (_source, { limit, offset }, { dataSources }) =>
      dataSources.albumAPI.getAlbums(limit, offset),
    album: async (_source, { id }, { dataSources }) =>
      dataSources.albumAPI.getAlbum(id),
  },
  Album: {
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
      parent.trackIds.forEach((trackId) =>
        tracks.push(dataSources.trackAPI.getTrack(trackId))
      );
      const result = Promise.all(tracks);
      return result;
    },
  },
  Mutation: {
    createAlbum: async (
      _source,
      { name, released, artistsIds, bandsIds, trackIds, genresIds },
      { dataSources }
    ) =>
      dataSources.albumAPI.createAlbum(
        name,
        released,
        artistsIds,
        bandsIds,
        trackIds,
        genresIds
      ),

    updateAlbum: async (
      _source,
      { id, name, released, artistsIds, bandsIds, trackIds, genresIds },
      { dataSources }
    ) =>
      dataSources.albumAPI.updateAlbum(
        id,
        name,
        released,
        artistsIds,
        bandsIds,
        trackIds,
        genresIds
      ),

    deleteAlbum: async (_source, { id }, { dataSources }) =>
      dataSources.albumAPI.deleteAlbum(id),
  },
};
