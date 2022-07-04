
export const user = {
    Query: {
        user: async (_source, { id }, { dataSources }) => {
            return dataSources.usersAPI.getUser(id)
        },
    },
}