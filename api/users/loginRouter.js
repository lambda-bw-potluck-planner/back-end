const express = require('express');
const Login = require('./loginModel');
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Post /api/login (login)
router.post('/login', async (req, res, next) => {
    try {
          const { username, password } = req.body
          
      if (!username || !password) {
              return res.status(401).json({
                  message: "username and password required",
              })
          }
          const user = await Login.findBy({ username }).first()
  
      const passwordValid = await bcrypt.compare(password, user.password)
          if (!user || !passwordValid) {
              return res.status(401).json({
                  message: "invalid credentials",
              })
      }
          const token = jwt.sign({
              id: user.id,
          }, process.env.JWT_SECRET)
          res.cookie("token", token)
          res.json({
              message: `Welcome, ${user.username}!`,
            //   token: token
          })
      } catch(err) {
          next(err)
      }
    })

    module.exports=router