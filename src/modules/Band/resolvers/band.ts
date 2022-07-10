export const band = {
  Query: {
    bands: async (_source, { limit, offset }, { dataSources }) =>
      dataSources.bandAPI.getBands(limit, offset),
    band: async (_source, { id }, { dataSources }) =>
      dataSources.bandAPI.getBand(id),
  },
  Band: {
    id: (parent) => parent._id,
    genres: (parent, _, { dataSources }) => {
      const genres = [];
      parent.genresIds.forEach((genreId) =>
        genres.push(dataSources.genresAPI.getGenre(genreId))
      );
      const result = Promise.all(genres);
      return result;
    },
  },
  Mutation: {
    createBand: async (
      _source,
      { name, origin, members, website, genresIds },
      { dataSources }
    ) =>
      dataSources.bandAPI.createBand(name, origin, members, website, genresIds),

    updateBand: async (
      _source,
      { id, name, origin, members, website, genresIds },
      { dataSources }
    ) =>
      dataSources.bandAPI.updateBand(
        id,
        name,
        origin,
        members,
        website,
        genresIds
      ),

    deleteBand: async (_source, { id }, { dataSources }) =>
      dataSources.bandAPI.deleteBand(id),
  },
};
