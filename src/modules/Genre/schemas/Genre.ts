import { gql } from 'apollo-server';

export const Genre = gql`type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
}
    `;
