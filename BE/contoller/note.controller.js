import Note from "../models/note.model.js";
import mongoose from 'mongoose';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({});
        return res.status(200).json({ success: true, data: notes });
    } catch (error) {
        console.log("Error Fetching notes", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createNote = async (req, res) => {
    const note = req.body;
    if (!note.title || !note.content) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newNote = new Note(note);

    try {
        await newNote.save();
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        console.error("Error in Create Note", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const note = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Note Id" });
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
        res.status(200).json({ success: true, message: "Note updated Successfully", data: updatedNote });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Note Id" });
    }

    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Note Deleted" });
    } catch (error) {
        console.log("Error in deleting Note", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
