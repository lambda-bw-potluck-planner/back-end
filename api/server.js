const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const cookieParser= require("cookie-parser")




const registerRouter = require('./users/registerRouter');
const loginRouter = require('./users/loginRouter');
const restrict = require('./middleware/restricted');
const usersRouter = require('./users/usersRouter');
const potluckRouter = require('./potluck/potluckRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser())

server.get('/',()=>{
	return {message:'potluck planner who dis?'}
})
server.use('/',registerRouter);
server.use('/',loginRouter);
server.use('/', restrict, usersRouter);
server.use('/', restrict, potluckRouter);


server.use((err, req, res, next) => {
    console.log(err)
    console.log(req.body)
	res.status(500).json({
		message: `Something went wrong, ${err} `
	})
})
module.exports = server;