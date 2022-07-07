export const genre = {
  Query: {
      genres: async (_source, { limit, offset }, { dataSources }) => dataSources.genresAPI.getGenres(limit, offset),
  },
  Mutation: {
      createGenre: async (_source, { name, description, country, year }, { dataSources }) => dataSources.genresAPI.createGenre(name, description, country, year),
  },
};
