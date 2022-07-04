export const user = {
  Query: {
    user: async (_source, { id }, { dataSources }) => dataSources.usersAPI.getUser(id),
  },
  Mutation: {
    jwt: async (_source, { email, password }, { dataSources }) => {
      const data = await dataSources.usersAPI.jwt(email, password);
      return data.jwt;
    },

    register: async (_source, {
      firstName, lastName, email, password,
    }, { dataSources }) => dataSources.usersAPI.register(firstName, lastName, email, password),
  },
};
