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
  ArtistAPI,
  BandAPI,
  TrackAPI,
  AlbumAPI,
} from "./modules";
import { user } from "./modules/User/resolvers/user";
import { genre } from "./modules/Genre/resolvers/genre";
import { artist } from "./modules/Artist/resolvers/artist";
import { band } from "./modules/Band/resolvers/band";
import { track } from "./modules/Track/resolvers/track";
import { album } from "./modules/Album/resolvers/album";

dotenv.config();

const resolvers = {
  ...user,
  ...band,
  ...genre,
  ...artist,
  ...track,
  ...album,
  ...{
    Query: {
      ...user.Query,
      ...genre.Query,
      ...band.Query,
      ...artist.Query,
      ...track.Query,
      ...album.Query,
    },
    Mutation: {
      ...user.Mutation,
      ...genre.Mutation,
      ...band.Mutation,
      ...artist.Mutation,
      ...track.Mutation,
      ...album.Mutation,
    },
  },
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
    artistAPI: new ArtistAPI(),
    bandAPI: new BandAPI(),
    trackAPI: new TrackAPI(),
    albumAPI: new AlbumAPI(),
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
