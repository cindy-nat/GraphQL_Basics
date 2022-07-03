import {gql} from "apollo-server";

export const Track = gql`
type Track {
    id: ID!
    title: String!
    albums: [Album]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
}
    `