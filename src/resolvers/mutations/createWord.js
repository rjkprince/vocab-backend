module.exports = async (_, { input }, { models }) => {
    const newWord = await models.Word.create(input)
    return newWord
}