import mongoose from 'mongoose';

//1st step: Define the schema for the Note model
// A schema defines the structure of the documents within a collection in MongoDB.
// It specifies the fields, their types, and any validation rules.
// In this case, the Note model has two fields: title and content, both of which are required strings.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema.
//2nd step: Create the model using the schema
// A model is a compiled version of the schema that allows you to interact with the MongoDB
// collection. It provides methods for creating, reading, updating, and deleting documents.

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }},{timestamps: true}// Automatically adds createdAt and updatedAt fields
);

const Note = mongoose.model('Note', noteSchema)

export default Note;


    