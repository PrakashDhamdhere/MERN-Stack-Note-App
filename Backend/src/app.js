const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const notesRouter = require('./routes/notes.routes');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', notesRouter);
app.use('/api/auth', authRouter);

// app.use('*name', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// })


module.exports = app;