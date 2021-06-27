const { UserInputError, ApolloError } = require("apollo-server")
const axios = require("axios")

//function to change the oxford api response to desired formate (word type)
const getWord = (word) => {
    const resWord = word.map(def => {
        return {
            partsOfSpeech: def["lexicalCategory"]["text"],
            origin: def["entries"][0]["etymologies"],
            definition: def["entries"][0]["senses"][0]["definitions"],
            examples:def["entries"][0]["senses"][0]["examples"]?.map(e=>e.text)
        }
    })
    return resWord
}

module.exports = async (_, { input }, { models }) => {
    const { name } = input || { name: null } // extract name from input
    if(!name)throw new UserInputError('Invalid word') // if name is null or undefined
    const findWordInDb = await models.Word.findOne({ name: { '$regex': name, $options: 'i' } })//find if word exist in database
    if (findWordInDb) throw new UserInputError('The given word already exists.')// if word exists in database
    else {
        try {
            //fetching word details from oxford api
            const fetchWord = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${name.toLowerCase()}?strictMatch=false`, {
                headers: {
                    "Accept": "application/json",
                    "app_id": process.env.OXFORD_APP_ID,//app id and app key credential from oxford api dashboard
                    "app_key": process.env.OXFORD_APP_KEY
                }
            })
            const resWord = getWord(fetchWord.data.results[0].lexicalEntries)//getting desired formate of data
            try{
                const newWord = await models.Word.create({  //storing the word in database
                    name: fetchWord.data.word,
                    details:resWord
                });
                return newWord //returning the stored word
            }
            catch(e){
                throw new ApolloError(e) //if error occurs while storing word details in database
            }
        } catch (err) {
            //if error occurs while fetching word details from oxford api
            console.log(err.message)
            throw new UserInputError('Invalid word')
        }
    }

}