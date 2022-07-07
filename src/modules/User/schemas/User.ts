import { gql } from 'apollo-server';

export const User = gql`
type User {
    _id: ID!
    firstName: String
    lastName: String
    password: String
    email: String!
}
extend type Query {
    user(id: ID!): User
    jwt(email:String!, password: String!): String
}
extend type Mutation {
    register(firstName: String!,lastName: String!, email: String!, password: String!): User
}
    `;
