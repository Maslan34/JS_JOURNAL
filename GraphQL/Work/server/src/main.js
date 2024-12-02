import { ApolloServer } from "@apollo/server";
//import { startStandaloneServer } from "@apollo/server/standalone";
//import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
//import gql from "graphql-tag";

import { PubSub } from "graphql-subscriptions";

// Subsriciption
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import http from "http";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
const port = 4002;
const pubsub = new PubSub();
const app = express();
const httpServer = http.createServer(app);


// CORS OPERATION

import  cors from 'cors';

// To allow access to all resources:

app.use(cors());


app.use(
  cors({
    origin: 'http://localhost:4002', // Allowed origin
    methods: 'GET,POST', // Allowed HTTP METHODS
    credentials: true,   // FOR CREDENTIALS REQUESTS
  })
);

// CORS OPERATION



// FOR THE PATHFILE OPERATIONS

import path from "path";
import { fileURLToPath } from "url";

// __dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { readFileSync } from "fs";
const schemaPath = path.join(__dirname, "graphql", "schema.graphql");
var typeDefs = readFileSync(schemaPath, "utf-8"); // Reading File

// MAIN

import { resolvers } from "./graphql/resolvers/index.js";

const schema = makeExecutableSchema({
  typeDefs,

  resolvers,
});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const wsServerCleanup = useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

   
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsServerCleanup.dispose();
          },
        };
      },
    },
  ],
});

await apolloServer.start();

app.use("/graphql", bodyParser.json(), expressMiddleware(apolloServer));

httpServer.listen(port, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${port}/graphql`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${port}/graphql`
  );
});
