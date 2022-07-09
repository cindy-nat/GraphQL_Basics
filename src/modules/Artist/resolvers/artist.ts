export const artist = {
  Query: {
    artistes: async (_, { limit, offset }, { dataSources }) =>
      dataSources.artistAPI.getArtists(limit, offset),
    artist: async (_source, { id }, { dataSources }) =>
      dataSources.artistAPI.getArtist(id),
  },
  Artist: {
    id: (parent) => parent._id,
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
    createArtist: async (
      _source,
      {
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments,
      },
      { dataSources }
    ) =>
      dataSources.artistAPI.createArtist(
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments
      ),
    updateArtist: async (
      _source,
      {
        id,
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments,
      },
      { dataSources }
    ) =>
      dataSources.artistAPI.updateArtist(
        id,
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments
      ),
    deleteArtist: async (_source, { id }, { dataSources }) =>
      dataSources.artistAPI.deleteArtist(id),
  },
};
