const { mongoose } = require("mongoose");


const initDatabase = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/db")
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    initDatabase,
};