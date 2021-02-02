const express = require('express');
const router = express.Router();
const Users= require('./usersModel')

// Get /api/users done

// Get /api/users/:id done

// Get /api/users/:id/invitations done

// Post /api/users/:id/invitations done

// Get /api/users/:id/invitations/:id

router.get("/users", async (req, res, next) => {
	try {
		res.json(await Users.getUsers())
	} catch(err) {
		next(err)
	}
})

router.get("/users/:id", async (req, res, next) => {
	try {
		const users = await Users.getUserById(req.params.id)
		if (!users) {
			return res.status(404).json({
				message: "user not found",
			})
		}

		res.json(users)
	} catch (err) {
		next(err)
	}
})

router.get('/users/:id/invitations', async (req, res, next) => {
    const { id } = req.params;
  
    try{
      const invite= await Users.getInvitations(id)
      if (!invite) {
        return res.status(404).json({
          message: "Invitation not found",
        })}
        res.json(invite)
      }
      // .then(invitations => {
      //   if (invitations.length) {
      //     res.json(invitations);
      //   } else {
      //     res.status(404).json({ message: 'Could not find invitations for this User' })
      //   }
      // })
      catch(err){
        next(err);
      };
  });

  router.get("/users/:id/invitations/:inviteId ", async (req, res, next) => {
	try {
		const inviteInfo = await Users.getInviteById(req.params.id)
		if (!inviteInfo) {
      console.log(req.params)
			return res.status(404).json({
				message: "Invitation not found",
			})
		}		res.json(inviteInfo)
	} catch (err) {
		next(err)
	}
})

  router.post('/users/:id/invitations', (req, res, next) => {
    const inviteData = req.body;
    const { id } = req.params;
    Users.getUserById(id)
    // Users.getUserById(id)
      .then(user => {
        if (user) {
          return Users.addInvitation(inviteData, id);
        } else {
          res.status(404).json({ message: 'Could not find user with given id.' })
        }
      })
      .then(invite => {
        res.status(201).json(invite);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to add invite' });
        next(err)
      });
  });


module.exports = router





