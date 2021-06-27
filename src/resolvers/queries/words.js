module.exports = async (_, { }, { models }) => {
    return await models.Word.find()
}