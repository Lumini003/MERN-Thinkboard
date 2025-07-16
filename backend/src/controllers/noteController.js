
import Note from '../models/Note.js'; // Assuming you have a Note model defined


// Controller to handle getting all notes
// This function retrieves all notes from the database and sends them as a JSON response.
export async function getAllNotes  (_, res) {// Destructure the request object to ignore the request body
  // The underscore (_) is used to indicate that we are not using the request object in this function.
  // This is a common practice in JavaScript to avoid unused variable warnings.
  try{
    const notes = await Note.find().sort({ createdAt: -1 }); // Fetch all notes from the database, sorted by creation date in descending order
    res.status(200).json(notes);

  } catch (error) {
    console.error("Error in getAllNotes controller", error);

    res.status(500).json({message: "Internal Server Error"});
  }
};

// Controller to handle getting a note by its ID
// This function retrieves a specific note from the database based on the ID provided in the request parameters

export async function getNoteById (req, res) {
  try{

    const note = await Note.findById(req.params.id); // Find the note by ID from the request parameters
    if (!note) 
      return res.status(404).json({message: "Note not found"}); // If the note is not found, respond with a 404 status code and an error message
    res.status(200).json(note); // If the note is found, respond with the note data and a 200 status code

  }catch (error) {

    console.error("Error in getNoteById controller", error); // Log the error for debugging
    res.status(500).json({message: "Internal Server Error"}); // Respond with a 500 status code and an error message
  }
};


// Controller to handle creating a new note
// This function creates a new note in the database using the title and content provided in the request

export async function createNotes (req, res) {
  try{
    const { title, content } = req.body; // Destructure title and content from the request body
    const note = new Note({ title, content }); // Create a new Note instance with the provided title and content

    const saveNote=await note.save(); // Save the new note to the database
    res.status(201).json(saveNote); // Respond with a success message and a 201 status code

  } catch (error) {
    console.error("Error in createNotes controller", error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" }); // Respond with a 500 status code and an error message
  }

  
};

// Controller to handle updating an existing note
// This function updates a note in the database using the ID provided in the request parameters and the title and content provided in the request body
// It uses the findByIdAndUpdate method to find the note by its ID and update its title and content.
// The new option is set to true to return the updated document.

export async function updateNotes (req, res) {
  try{
    const {title, content} = req.body; // Destructure title and content from the request body
    const updateNote= await Note.findByIdAndUpdate(
      
      req.params.id, 
      {title, content},
      {
        new: true, // Return the updated document
        
      } // Update the note with the specified ID using the provided title and content
    );
    if (!updateNote) 
      return res.status(404).json({message: "Note not found"}); // If the note is not found, respond with a 404 status code and an error message
    // If the note is found and updated successfully, respond with a success message
    // and a 200 status code


      res.status(200).json(updateNote); // Respond with a success message


  } catch (error) {

    console.error("Error in updateNotes controller", error); // Log the error for debugging
    res.status(500).json({message: "Internal Server Error"}); // Respond with a 500 status code and an error message
  }
};


// Controller to handle deleting a note
// This function deletes a note from the database using the ID provided in the request parameters   


export async function deleteNotes  (req, res)  {

  try{

    const deleteNote = await Note.findByIdAndDelete(req.params.id); // Find and delete the note with the specified ID

    if (!deleteNote) 
      return res.status(404).json({message: "Note not found"}); // If the note is not found, respond with a 404 status code and an error message
    res.status(200).json({message: "Note deleted successfully"}); // If the note is found and deleted successfully, respond with a success message

  }catch (error) {
    console.error("Error in deleteNotes controller", error); // Log the error for debugging
    res.status(500).json({message: "Internal Server Error"}); // Respond with a 500 status code and an error message

  }
    

  
};
