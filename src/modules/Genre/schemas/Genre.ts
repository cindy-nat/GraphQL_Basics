import { gql } from 'apollo-server';

export const Genre = gql`type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
}
extend type Query {
    genres(limit: Int, offset: Int): [Genre!]
}
extend type Mutation {
    createGenre(name: String!, description: String, country: String, year: Int): Genre
}
    `;