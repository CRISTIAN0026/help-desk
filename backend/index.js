import express from 'express';
import { connect } from 'mongoose';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import authMiddleware from './src/middleware/auth.js';
import resolvers from './src/resolvers/index.js';
import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( async() => {
    // const collections = await mongoose.connection.db.collections();
    // for (const collection of collections) {
      // await collection.drop();
    // }
    console.log('Connected to MongoDB')})
  .catch((err) => console.error('Error connecting to MongoDB:', err));

  const typesArray = loadFilesSync(path.join(__dirname, 'src/schema'), { extensions: ['graphql'] });


const typeDefs = mergeTypeDefs(typesArray);
const mergedResolvers = mergeResolvers(resolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolvers,
  context: ({ req }) => ({ req }),
});

async function startApolloServer() {
  await server.start();

  app.use(authMiddleware);
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
