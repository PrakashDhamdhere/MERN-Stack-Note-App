const express = require('express');
const { createNotes, getOneNote, deleteNotes, updateNotes, getNotes } = require('../controllers/notes.controller');
const notesRouter = express.Router();
const userModel = require('../models/user.model');
const isLoggedIn = require('../middlewares/auth.middleware');



notesRouter.post('/notes', isLoggedIn, createNotes)

notesRouter.get('/notes', isLoggedIn, getNotes)

notesRouter.get('/notes/:id', isLoggedIn, getOneNote)

notesRouter.delete('/notes/:id', isLoggedIn, deleteNotes)

notesRouter.patch('/notes/:id', isLoggedIn, updateNotes)

module.exports = notesRouter;