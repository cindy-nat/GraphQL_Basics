import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import * as dotenv from "dotenv";

dotenv.config();

export class GenresAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  async getGenres(limit = 5, offset = 0) {
    const data = await this.get("", {
      limit,
      offset,
    });
    return data.items;
  }

  async getGenre(id: string) {
    return this.get(`/${id}`);
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async createGenre(name, description, country, year) {
    return this.post("", {
      name,
      description,
      country,
      year,
    });
  }

  async updateGenre(id, name, description, country, year) {
    return this.put(`/${id}`, {
      name,
      description,
      country,
      year,
    });
  }

  async deleteGenre(id) {
    const data = await this.delete(`/${id}`);
    return { acknowledged: data.acknowledged, deletedCount: data.deletedCount };
  }
}
