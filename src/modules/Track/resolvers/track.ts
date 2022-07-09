export const track = {
  Query: {
    tracks: async (_source, { limit, offset }, { dataSources }) =>
      dataSources.trackAPI.getTracks(limit, offset),
    track: async (_source, { id }, { dataSources }) =>
      dataSources.trackAPI.getTrack(id),
  },
  Track: {
    id: (parent) => parent._id,
    // TODO добавить альбом
    album: () => {},
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
  },
  Mutation: {
    createTrack: async (
      _source,
      { title, albumId, bandsIds, artistsIds, duration, released, genresIds },
      { dataSources }
    ) =>
      dataSources.trackAPI.createTrack(
        title,
        albumId,
        bandsIds,
        artistsIds,
        duration,
        released,
        genresIds
      ),

    updateTrack: async (
      _source,
      {
        id,
        title,
        albumId,
        bandsIds,
        artistsIds,
        duration,
        released,
        genresIds,
      },
      { dataSources }
    ) =>
      dataSources.trackAPI.updateTrack(
        id,
        title,
        albumId,
        bandsIds,
        artistsIds,
        duration,
        released,
        genresIds
      ),

    deleteTrack: async (_source, { id }, { dataSources }) =>
      dataSources.trackAPI.deleteTrack(id),
  },
};
