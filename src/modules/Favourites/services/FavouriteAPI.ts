import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";

dotenv.config();

enum FavouritesEnum {
  bands = "bands",
  tracks = "tracks",
  genres = "genres",
  artists = "artists",
}

export class FavouriteAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.FAVOURITES_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async getFavourites(limit = 5, offset = 0) {
    return this.get("", {
      limit,
      offset,
    });
  }

  async addTrackToFavourites(tracksId) {
    return this.put("/add", {
      type: FavouritesEnum.tracks,
      id: tracksId,
    });
  }

  async addBandToFavourites(bandsId) {
    return this.put("/add", {
      type: FavouritesEnum.bands,
      id: bandsId,
    });
  }

  async addArtistToFavourites(artistsId) {
    return this.put("/add", {
      type: FavouritesEnum.artists,
      id: artistsId,
    });
  }

  async addGenreToFavourites(genresId) {
    return this.put("/add", {
      type: FavouritesEnum.genres,
      id: genresId,
    });
  }
}
