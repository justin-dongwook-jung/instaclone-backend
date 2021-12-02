import { ApolloServer } from "apollo-server";
import schema from './schema';

const server = new ApolloServer({
  schema
})

server.listen().then(() => console.log(`Running on http://localhost:4000`));
