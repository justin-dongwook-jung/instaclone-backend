require('dotenv').config()
import { ApolloServer } from "apollo-server";
import schema from './schema';

const server = new ApolloServer({
  schema,
  context: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM4NTQwNjc3fQ.8xD4TnRk_Bg3Mr3Ne4DBztbDkw4XgQ-I2xmfOd-CA3A"
  }
})

const PORT = process.env.PORT

server.listen().then(() => console.log(`🚀 Running on http://localhost:${PORT}`));
