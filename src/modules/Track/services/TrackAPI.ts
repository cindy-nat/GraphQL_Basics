import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";

dotenv.config();

export class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.TRACKS_URL;
  }

  async getTracks(limit = 5, offset = 0) {
    const data = await this.get("", {
      limit,
      offset,
    });
    return data.items;
  }

  async getTrack(id: string) {
    return this.get(`/${id}`);
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async createTrack(
    title,
    albumId,
    bandsIds,
    artistsIds,
    duration,
    released,
    genresIds
  ) {
    return this.post("", {
      title,
      albumId,
      bandsIds,
      artistsIds,
      duration,
      released,
      genresIds,
    });
  }

  async updateTrack(
    id,
    title,
    albumId,
    bandsIds,
    artistsIds,
    duration,
    released,
    genresIds
  ) {
    return this.put(`/${id}`, {
      id,
      title,
      albumId,
      bandsIds,
      artistsIds,
      duration,
      released,
      genresIds,
    });
  }

  async deleteTrack(id) {
    const data = await this.delete(`/${id}`);
    return { acknowledged: data.acknowledged, deletedCount: data.deletedCount };
  }
}
