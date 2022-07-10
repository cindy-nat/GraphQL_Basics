import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";

dotenv.config();

export class ArtistAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.ARTISTS_URL;
  }

  async getArtists(limit = 5, offset = 0) {
    const data = await this.get("", {
      limit,
      offset,
    });
    return data.items;
  }

  async getArtist(id: string) {
    return this.get(`/${id}`);
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async createArtist(
    firstName,
    secondName,
    middleName,
    birthDate,
    birthPlace,
    country,
    bandsIds,
    instruments
  ) {
    return this.post("", {
      firstName,
      secondName,
      middleName,
      birthDate,
      birthPlace,
      country,
      bandsIds,
      instruments,
    });
  }

  async updateArtist(
    id,
    firstName,
    secondName,
    middleName,
    birthDate,
    birthPlace,
    country,
    bandsIds,
    instruments
  ) {
    return this.put(`/${id}`, {
      id,
      firstName,
      secondName,
      middleName,
      birthDate,
      birthPlace,
      country,
      bandsIds,
      instruments,
    });
  }

  async deleteArtist(id) {
    const data = await this.delete(`/${id}`);
    return { acknowledged: data.acknowledged, deletedCount: data.deletedCount };
  }
}
