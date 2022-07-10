import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";

dotenv.config();

export class AlbumAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.ALBUMS_URL;
  }

  async getAlbums(limit = 5, offset = 0) {
    const data = await this.get("", {
      limit,
      offset,
    });
    return data.items;
  }

  async getAlbum(id: string) {
    return this.get(`/${id}`);
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async createAlbum(name, released, artistsIds, bandsIds, trackIds, genresIds) {
    return this.post("", {
      name,
      released,
      artistsIds,
      bandsIds,
      trackIds,
      genresIds,
    });
  }

  async updateAlbum(
    id,
    name,
    released,
    artistsIds,
    bandsIds,
    trackIds,
    genresIds
  ) {
    return this.put(`/${id}`, {
      id,
      name,
      released,
      artistsIds,
      bandsIds,
      trackIds,
      genresIds,
    });
  }

  async deleteAlbum(id) {
    const data = await this.delete(`/${id}`);
    return { acknowledged: data.acknowledged, deletedCount: data.deletedCount };
  }
}
