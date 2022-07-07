export const genre = {
  Query: {
      genres: async (_source, { limit, offset }, { dataSources }) => dataSources.genresAPI.getGenres(limit, offset),
      genre: async (_source, { id }, { dataSources }) => dataSources.genresAPI.getGenre(id),
  },
  Mutation: {
      createGenre: async (_source, { name, description, country, year }, { dataSources }) => dataSources.genresAPI.createGenre(name, description, country, year),
      updateGenre: async (_source, { id, name, description, country, year }, { dataSources }) => dataSources.genresAPI.updateGenre(id, name, description, country, year),
  },
};
