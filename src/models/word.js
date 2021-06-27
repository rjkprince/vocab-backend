const mongoose = require("mongoose")
const { Schema } = mongoose

const wordSchema = new Schema({
    name:String
})

const Word = mongoose.model("Word", wordSchema);

module.exports = {
    Word
}