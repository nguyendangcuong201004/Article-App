import express, { Express, Request, Response } from "express";
import env from "dotenv";
env.config();

import { connect } from "./config/database"
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";

connect()


const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

const startServer = async () => {
    // GraphQL
    
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app as any,
        path: '/nguyendangcuong'
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

startServer();