const express = require('express');
const authRouter = express.Router();
const {createUser} = require('../controllers/authController');

authRouter.post('/register',createUser);

module.exports = authRouter;