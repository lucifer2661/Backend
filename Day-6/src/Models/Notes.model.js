const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    age: Number
});

// Mongoose automatically pluralizes "Note" to "notes" in MongoDB
const noteModel = mongoose.model("Note", noteSchema);

module.exports = noteModel;
