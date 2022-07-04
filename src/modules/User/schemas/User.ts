import { gql } from 'apollo-server';

export const User = gql`
type User {
    id: ID!
    firstName: String
    secondName: String
    password: String
    email: String!
}
extend type Query {
    user: User
}
    `;
