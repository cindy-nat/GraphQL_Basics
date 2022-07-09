export const band = {
  Query: {
    bands: async (_source, { limit, offset }, { dataSources }) => {
      const bandsData = await dataSources.bandAPI.getBands(limit, offset);
      return bandsData.map((bandData) => ({
        ...bandData,
        genres: bandData.genresIds.map(async (genre) =>
          dataSources.genresAPI.getGenre(genre)
        ),
      }));
    },
    band: async (_source, { id }, { dataSources }) => {
      const bandData = await dataSources.bandAPI.getBand(id);
      return {
        ...bandData,
        genres: bandData.genresIds.map((genre) =>
          dataSources.genresAPI.getGenre(genre)
        ),
      };
    },
  },

  Mutation: {
    createBand: async (
      _source,
      { name, origin, members, website, genresIds },
      { dataSources }
    ) => {
      const result = await dataSources.bandAPI.createBand(
        name,
        origin,
        members,
        website,
        genresIds
      );
      return result.genresIds.length > 0
        ? {
            ...result,
            genres: result.genresIds.map((genre) =>
              dataSources.genresAPI.getGenre(genre)
            ),
          }
        : result;
    },

    updateBand: async (
      _source,
      { id, name, origin, members, website, genresIds },
      { dataSources }
    ) => {
      const result = await dataSources.bandAPI.updateBand(
        id,
        name,
        origin,
        members,
        website,
        genresIds
      );

      return result.genresIds.length > 0
        ? {
            ...result,
            genres: result.genresIds.map((genre) =>
              dataSources.genresAPI.getGenre(genre)
            ),
          }
        : result;
    },

    deleteBand: async (_source, { id }, { dataSources }) =>
      dataSources.bandAPI.deleteBand(id),
  },
};
