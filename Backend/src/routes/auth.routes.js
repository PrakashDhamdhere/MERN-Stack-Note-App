const express = require('express');
const { registerUser, loginUser, logout, getMe } = require('../controllers/auth.controller');
const isLoggedIn = require('../middlewares/auth.middleware');
const authRouter = express.Router();

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logout)
authRouter.get('/me', isLoggedIn, getMe)


module.exports = authRouter;