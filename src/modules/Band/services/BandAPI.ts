import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";

dotenv.config();

export class BandAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BANDS_URL;
  }

  async getBands(limit = 5, offset = 0) {
    const data = await this.get("", {
      limit,
      offset,
    });
    return data.items;
  }

  async getBand(id: string) {
    return this.get(`/${id}`);
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async createBand(name, origin, members, website, genresIds) {
    return this.post("", {
      name,
      origin,
      members,
      website,
      genresIds,
    });
  }

  async updateBand(id, name, origin, members, website, genresIds) {
    return this.put(`/${id}`, {
      name,
      origin,
      members,
      website,
      genresIds,
    });
  }

  async deleteBand(id) {
    const data = await this.delete(`/${id}`);
    return { acknowledged: data.acknowledged, deletedCount: data.deletedCount };
  }
}
