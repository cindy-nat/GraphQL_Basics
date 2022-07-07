import { ApolloServer, gql } from "apollo-server";
import * as dotenv from "dotenv";
import {
  Track,
  Album,
  Favourites,
  Genre,
  Artist,
  Band,
  User,
  UsersAPI,
  GenresAPI,
} from "./modules";
import { user } from "./modules/User/resolvers/user";
import { genre } from "./modules/Genre/resolvers/genre";

dotenv.config();

const resolvers = {
  Query: { ...user.Query, ...genre.Query },
  Mutation: { ...user.Mutation, ...genre.Mutation },
};

const root = gql`
  type Delete {
    acknowledged: Boolean
    deletedCount: Int
  }
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = [root, Track, Album, Artist, Band, Favourites, Genre, User];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    usersAPI: new UsersAPI(),
    genresAPI: new GenresAPI(),
  }),
  csrfPrevention: true,
  cache: "bounded",
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    return { token };
  },
});

// The `listen` method launches a web server.
server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
