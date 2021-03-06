/**
 * @name server.js
 *
 * @description If I had a dollar for every time I misspelled resovler
 */

// Dep Imports
import express from 'express';
import {
  ApolloError,
  UserInputError,
  AuthenticationError,
  ApolloServer,
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import http from 'http';

// Custom Imports
// -- typeDefs, resolvers, utils, etc
import typeDefs from './apollo/typeDefs';
import resolvers from './apollo/resolvers';
import dataSources from './apollo/datasources';
import models from './mongoose/models';

// Env Vars
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const GQL_PORT = process.env.GQL_PORT;

const ACCESS_KEY = 'NEEDTOMAKESECRET';
const REFRESH_KEY = 'KEYSBUTIAMLAZY';

// MONGOOSE
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.once('open', () => {
  const d = new Date();
  console.log(
    `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] Connected to a MongoDB instance at ${MONGO_URI}`
  );
});

// APOLLO SERVER
// TODO break out formatError, context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  dataSources: () => ({
    userData: new dataSources.UserDataSource(models.UserModel),
    memberData: new dataSources.MemberDataSource(models.MemberModel),
  }),
  // formatError(err) {
  //   if (err.originalError instanceof UserInputError) {
  //     return new Error(`Input Error: ${err.originalError.message}`);
  //   } else if (err.originalError instanceof AuthenticationError) {
  //     return new Error(`Auth Error: ${err.originalError.message}`);
  //   } else {
  //     return new Error(`Other error for now: ${err}`);
  //   }
  // },
  // TODO turn tracing off in prod
  tracing: true,

  context: async ({ req, res, connection }) => {
    let currentUser;
    // console.log(headers.authorizaton);

    /**
     * TODO Change scope to check for expired token
     * This should check if token is expired and throw a
     * TOKEN_EXPIRED error code if it is
     * client should request refresh on TOKEN_EXPIRED
     * so UNATUHENTICATED can be reserved for RBAC/Authorization
     *
     * If it is not expired then check validity and throw an
     * UNAUTHENTICATED
     */
    if (connection) {
      //return connection.context;
    } else {
      if (req.headers.authorization) {
        console.log('auth found');
        // authorization: Bearer $token
        const accessToken = req.headers.authorization.split(' ')[1];

        let accessPayload;
        if (accessToken) {
          try {
            accessPayload = jwt.verify(accessToken, ACCESS_KEY);
            //console.log(`Payload: ${accessPayload}`);
          } catch (err) {
            throw new AuthenticationError(err);
          }
        }

        if (!accessPayload) {
          throw new AuthenticationError(`Access Token Invalid`);
        }

        if (accessPayload) {
          currentUser = {
            id: accessPayload.id,
            username: accessPayload.username,
            role: accessPayload.role,
          };
        }
      }
    }
    return { req, res, currentUser };
  },
});

// START EXPRESS
const app = express();

// Middleware here
app.use(cookieParser());
app.use(bodyParser.json({}));

// TODO Set up cors config for prod
//const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://192.168.6.57',
    'http://192.168.6.51:3000',
  ],
  // origin: 'http://192.168.6.51:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true,
};

// const corsOptions = {
//   origin: '*',
//   credentials: true,
// };
// app.use(cors(corsOptions));

server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

// LAUNCH
httpServer.listen({ port: GQL_PORT }, () => {
  console.log(
    `Server is ready at http://localhost:${GQL_PORT}${server.graphqlPath}`
  );
  console.log(
    `Subscriptions ready at ws://localhost:${GQL_PORT}${server.subscriptionsPath}`
  );
});
