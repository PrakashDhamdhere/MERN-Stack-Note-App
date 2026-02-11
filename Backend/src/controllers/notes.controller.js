const noteModel = require('../models/note.model');
const userModel = require('../models/user.model');

async function createNotes(req, res){
    const {title, description} = req.body;
    const user = await userModel.findOne({email: req.user.email}).select("-password")
    console.log(user);
    const note = await noteModel.create({
        title,
        description
    })
    user.notes.push(note._id);
    await user.save();
    res.status(201).json({
        message: "Note created successfully",
        note
    })
}

async function getNotes(req, res){
    const user = await userModel
    .findOne({email: req.user.email})
    .select("-password")
    .populate("notes");
    res.status(200).json({
        message: "Notes fetched successfully",
        notes: user.notes
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
    const user = await userModel
    .findById(req.user.id)
    .select("-password")
    user.notes.splice(user.notes.indexOf(deletedNote._id), 1)
    await user.save();
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