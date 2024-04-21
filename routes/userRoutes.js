const express = require('express');
const authRouter = express.Router();
const {getUsers,getUserByUserName} = require('../controllers/userController');

authRouter.get('/getusers',getUsers);
authRouter.post('/getuser',getUserByUserName);

module.exports = authRouter;