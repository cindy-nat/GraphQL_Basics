import { RESTDataSource } from 'apollo-datasource-rest';
import * as dotenv from 'dotenv';

dotenv.config();

export class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USER_URL;
  }

  async getUser(id) {
    return this.get(`/${id}`);
  }

  async jwt(email, password) {
    return this.post('login', { email, password });
  }
}
