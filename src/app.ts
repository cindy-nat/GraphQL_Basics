import { ApolloServer, gql } from 'apollo-server';
import { Track } from './modules/Track/schemas/Track';
import { Album } from './modules/Album/schemas/Aldum';
import { Favourites } from './modules/Favourites/schemas/Favourites';
import { Genre } from './modules/Genre/schemas/Genre';
import { Artist } from './modules/Artist/schemas/Artist';
import { Band } from './modules/Band/schemas/Band';
import { User } from './modules/User/schemas/User';

const resolvers = {
  Query: {
    user: () => ({ id: 123 }),
  },
};

const root = gql`
type Query {
    root: String
}`;

const typeDefs = [root, Track, Album, Artist, Band, Favourites, Genre, User];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

// The `listen` method launches a web server.
server.listen(3000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
