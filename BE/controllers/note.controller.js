import { supabase } from '../config/supabase.js';

export const getNotes = async (req, res) => {
    try {
        const { data: notes, error } = await supabase
            .from('notes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.log("Error fetching notes:", error.message);
            return res.status(500).json({ success: false, message: "Server Error" });
        }

        return res.status(200).json({ success: true, data: notes });
    } catch (error) {
        console.log("Error fetching notes:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const { data: newNote, error } = await supabase
            .from('notes')
            .insert([{ title, content }])
            .select()
            .single();

        if (error) {
            console.error("Error creating note:", error);
            return res.status(500).json({ success: false, message: "Server Error" });
        }

        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        console.error("Error in Create Note:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const { data: updatedNote, error } = await supabase
            .from('notes')
            .update({ title, content, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Error updating note:", error);
            return res.status(500).json({ success: false, message: "Server Error" });
        }

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, message: "Note updated successfully", data: updatedNote });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting note:", error);
            return res.status(500).json({ success: false, message: "Server Error" });
        }

        res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.log("Error in deleting note:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};