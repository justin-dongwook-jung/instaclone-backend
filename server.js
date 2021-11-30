const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'lady'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(() => console.log(`Running on http://localhost:4000`));
