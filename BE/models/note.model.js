// models/Note.js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

export default Note; // ✅ ES module export