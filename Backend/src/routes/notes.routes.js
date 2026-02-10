const express = require('express');
const { createNotes, getOneNote, deleteNotes, updateNotes, getNotes } = require('../controllers/notes.controller');
const notesRouter = express.Router();


notesRouter.post('/notes', createNotes)

notesRouter.get('/notes', getNotes)

notesRouter.get('/notes/:id', getOneNote)

notesRouter.delete('/notes/:id', deleteNotes)

notesRouter.patch('/notes/:id', updateNotes)

module.exports = notesRouter;