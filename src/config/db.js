require("dotenv").config()

const mongoose = require("mongoose")

//function to connect to database
const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
        if (err) console.log("connection to database failed!")
        else console.log("connection to database successful!")
    })
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error!"))

module.exports=connectDB