const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const notesRouter = require('./routes/notes.routes');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', notesRouter);

app.use('*name', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
})


module.exports = app;