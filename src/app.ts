import { ApolloServer, gql } from 'apollo-server';
import * as dotenv from 'dotenv';
import { Track } from './modules/Track/schemas/Track';
import { Album } from './modules/Album/schemas/Aldum';
import { Favourites } from './modules/Favourites/schemas/Favourites';
import { Genre } from './modules/Genre/schemas/Genre';
import { Artist } from './modules/Artist/schemas/Artist';
import { Band } from './modules/Band/schemas/Band';
import { User } from './modules/User/schemas/User';
import { user } from './modules/User/resolvers/user';
import { UsersAPI } from './modules/User/services/UserAPI';

dotenv.config();

const resolvers = {
  Query: { ...user.Query },
  Mutation: { ...user.Mutation },
};

const root = gql`
type Query {
    root: String
}
type Mutation {
root: String
}`;

const typeDefs = [root, Track, Album, Artist, Band, Favourites, Genre, User];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    usersAPI: new UsersAPI(),
  }),
  csrfPrevention: true,
  cache: 'bounded',
});

// The `listen` method launches a web server.
server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
