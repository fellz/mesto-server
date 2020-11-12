import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/root';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors({"origin": "*"}));

app.get('/hello', function (req, res) {
  res.send('hello world')
})

app.post('/users', function (req, res) {
  console.log(req.body);
  res.send('user created');
})

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
