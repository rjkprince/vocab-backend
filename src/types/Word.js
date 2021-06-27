const { gql } = require("apollo-server")

// all type definition of word subtypes,query and mutations
module.exports = gql`
    type Word{
        id:ID!
        name:String!
        details:[Details]
    }
    
    type Details{
        partsOfSpeech:String,
        origin:[String],
        definition:[String],
        examples:[String]
    }

    input CreateWordInput{
        name:String!
    }

    input GetWordInput{
        id:String!
     }

    type Query{
        words(input:GetWordInput):[Word]
    }

    type Mutation{
        createWord(input:CreateWordInput!):Word!
    }

`;