module.exports = async (_, { input }, { models }) => {
    const {id}=input ||{id:null}// extracting id from input
    if (!id) return await models.Word.find()//if id is null or undefined we will send all the words i.e. list of all words
    else {
        // else if we have id then we will get the word from database
        const response = await models.Word.findById(id)
        return [response]// sending word whose id is provided
    }
}