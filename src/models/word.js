const mongoose = require("mongoose")
const { Schema } = mongoose

//schmea for word object
const wordSchema = new Schema({
    name: String,
    details: [{
        partsOfSpeech: String,
        origin: [String],
        definition: [String],
        examples:[String]
    }]
})

// word model
const Word = mongoose.model("Word", wordSchema);

module.exports = {
    Word
}