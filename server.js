const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const connectDB = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
// const {InMemoryLRUCache} = require('apollo/utils.keyvaluecache')
const PORT = process.env.PORT || 3001;

const app = express();

let server = null;
const startServer = async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    cache: 'bounded',
  });
  await server.start();
  server.applyMiddleware({ app });
};

startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Failed to get static' });
  });
}

connectDB.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${ PORT }!`);
    console.log(`Use GraphQL at http://localhost:${ PORT }${ server.graphqlPath }`);
  });
});
