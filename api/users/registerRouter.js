const express = require('express');
const Register = require('./registerModel');
const bcrypt = require("bcryptjs");
const router = express.Router();


// Post /api/register (register)

router.post('/register', async (req, res, next) => {
    try {
        const { fullName, username, password, email} = req.body
        const user = await Register.findBy({ username }).first()
  
        if (user) {
            return res.status(409).json({
                message: "username taken",
            })
        }
      
        if(!fullName || !username || !password || !email) {
            return res.status(409).json({
                    message: "Info required",
                })
        }
  
          const newUser = await Register.add({
            fullName,
            username,
            password: await bcrypt.hash(password, 14),
            email
          })
  
          res.status(201).json(newUser)
      } catch(err) {
          next(err)
      }
})

module.exports=router