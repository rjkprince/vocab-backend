const { gql } = require("apollo-server")

module.exports = gql`
    type Word{
        id:ID!
        name:String!
    }

    input CreateWordInput{
        name:String!
    }

    type Query{
        words:[Word]
    }

    type Mutation{
        createWord(input:CreateWordInput):Word!
    }

`;