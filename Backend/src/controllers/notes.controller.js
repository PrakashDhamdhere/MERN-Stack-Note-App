const noteModel = require('../models/note.model');

async function createNotes(req, res){
    const {title, description} = req.body;
    const note = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "Note created successfully",
        note
    })
}

async function getNotes(req, res){
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    });
}

async function getOneNote(req, res){
    const note = await noteModel.findById(req.params.id);
    res.status(200).json({
        message: "Note fetched successfully",
        note
    });
}

async function deleteNotes(req, res){
    const deletedNote = await noteModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Note deleted successfully"
    })
}

async function updateNotes(req, res){
    const { description } = req.body;
    const deletedNote = await noteModel.findByIdAndUpdate(req.params.id, {description});
    res.status(200).json({
        message: "Note updated successfully"
    })
}




module.exports = { createNotes, getNotes, getOneNote, deleteNotes, updateNotes }