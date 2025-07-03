
import Note from "../models/Note.js"; // Assuming you have a Note model defined

export async function getNotes(_, res)  {
    try {
        // Simulating fetching notes from a database
        const notes = await Note.find().sort({createdAt:-1}); // Fetch all notes from the database
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
}

export async function createNotes(req, res) {
    try {
        const {title, content} = req.body; // Assuming the request body contains title and content
        const newNote = new Note({ title, content });
        await newNote.save(); // Save the new note to the database
        res.status(201).json({ message: "Note created successfully!", note: newNote });
    } catch (error) {
        res.status(500).json({ message: "Error creating note", error: error.message });
    }   
} 

export async function updateNotes(req, res)  {
      try{
        // Get the note ID from the request parameters
        const {title, content} = req.body; // Get the updated title and content from the request body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content },{new:true}); // Update the note in the database
       if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully!", note: updatedNote });
      }catch (error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
}
}

export async function deleteNotes(req, res)  {
     try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id); // Delete the note from the database
        if(!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully!" });
    }catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
} 

export  async function getNotebyId(req, res) {
    try {
        const note = await Note.findById(req.params.id); // Fetch a specific note by ID
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Error fetching note", error: error.message });
    }
}