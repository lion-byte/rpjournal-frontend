const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const path = require('path')

const { Mutation } = require('./resolvers/mutation')
const { Query } = require('./resolvers/query')

const createServer = () => {
  const typeDefs = importSchema(path.resolve(__dirname, './schema.graphql'))

  return new ApolloServer({
    // @ts-ignore
    typeDefs,
    resolvers: { Query, Mutation },
    mocks: true,
    mockEntireSchema: false,
    context: req => ({ ...req })
  })
}

module.exports = { createServer }
