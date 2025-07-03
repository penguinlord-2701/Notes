import express from 'express';
import { getNotes,updateNotes,deleteNotes,createNotes,getNotebyId } from '../controller/notescontroller.js';
const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNotebyId); // Assuming you want to fetch a specific note by ID
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);
export default router;