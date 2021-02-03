const express = require('express');
const router = express.Router();
const Users= require('./usersModel')

// Get /api/users done

// Get /api/users/:id done

// Get /api/users/:id/invitations done

// Post /api/users/:id/invitations done

// Get /api/users/:id/invitations/:id done

router.get("/users", async (req, res, next) => {
	try {
		res.json(await Users.getUsers())
	} catch(err) {
		next(err)
	}
})

router.get("/invites", async (req, res, next) => {
	try {
		res.json(await Users.getInvites())
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
      catch(err){
        next(err);
      };
  });

  router.get("/users/:id/invitations/:inviteId", (req, res, next) => {
    Users.getInviteById(req.params.id, req.params.inviteId)
    .then((invite) => {
      if (invite) {
        res.json(invite)
      } else {
        console.log(err)
        res.status(404).json({
          message: "Invite was not found",
        })
      }
    }) .catch (err =>{
      console.log(err)
      next(err)
    })
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





