//logic for our server (entry point)
const { ApolloServer } = require("apollo-server")
const { connectDB } = require("./config")
const typeDefs = require("./types")
const resolvers = require("./resolvers")
const models = require("./models")

//connecting to database
connectDB()

//getting a server instane with configurations and context
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:{models}
})


//starting server and listening at given port
server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
    console.log(`server is running at ${url}`)
})