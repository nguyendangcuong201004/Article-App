import { gql } from "apollo-server-express";

export const typeDefsUser = gql `

    type User {
        code: Int,
        message: String
        id: String,
        fullName: String,
        email: String,
        token: String,
    }

    input UserInput {
        fullName: String,
        email: String,
        password: String,
    }

    type Mutation {
        register(user: UserInput): User
    }

`