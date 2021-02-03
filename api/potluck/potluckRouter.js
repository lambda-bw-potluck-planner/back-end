const express = require('express');
const router = express.Router();
const Potlucks= require('./potluckModel')

// Post /api/potlucks done

// Get /api/potlucks done

// Get /api/potlucks/:id done

// Update /api/potlucks/:id done

// Post /api/potlucks/:id/items done

// Get /api/potlucks/:id/items done

// Get /api/potlucks/:id/items/:id done

router.get("/potlucks", async (req, res, next) => {
	try {
		res.json(await Potlucks.getPotlucks())
	} catch(err) {
		next(err)
	}
})

router.get("/itemsList", async (req, res, next) => {
	try {
		res.json(await Potlucks.getItemsList())
	} catch(err) {
		next(err)
	}
})

router.get("/potlucks/:id", async (req, res, next) => {
	try {
		const potluck = await Potlucks.getPotluckById(req.params.id)
		if (!potluck) {
			return res.status(404).json({
				message: "potluck not found",
			})
		}

		res.json(potluck)
	} catch (err) {
		next(err)
	}
})

router.get("/potlucks/:id/itemsList/:itemId",  (req, res, next) => {
  console.log(req.params)
   Potlucks.getItemById(req.params.id, req.params.itemId)
  .then((item) => {
    if (item) {
      res.json(item)
    } else {
      console.log(err)
      res.status(404).json({
        message: "Item was not found",
      })
    }
  }) .catch (err =>{
    console.log(err)
		next(err)
  })
})

router.post("/potlucks", async (req, res, next) => {
	try {
        const {eventName,date,time,address}=req.body
		const potluck = await Potlucks.addPotluck({eventName,date,time,address})
		res.status(201).json(potluck)
	} catch (err) {
		next(err)
	}
})

router.get('/potlucks/:id/itemsList', async (req, res, next) => {
    const { id } = req.params;
  
    try{
      const item= await Potlucks.getItems(id)
      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        })}
        res.json(item)
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

  router.post('/potlucks/:id/items', (req, res, next) => {
    const itemData = req.body;
    const { id } = req.params;
  
    Potlucks.getPotluckById(id)
      .then(potluck => {
        if (potluck) {
          return Potlucks.addItem(itemData, id);
        } else {
          res.status(404).json({ message: 'Could not find potluck with given id.' })
        }
      })
      .then(item => {
        res.status(201).json(item);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to add item' });
        next(err)
      });
  });

router.put('/potlucks/:id', async (req,res,next)=>{
    try{

        const editPotluck=await Potlucks.update(req.params.id,req.body)
        res.json(editPotluck)
    }catch(err){
        next(err)
    }
})

router.delete('/potlucks/:id', async (req,res,next)=>{
    try{    
         await Potlucks.remove(req.params.id)
            res.status(200).json({message: "Potluck has been deleted."})
    }catch(err){next(err)}
})

module.exports = router





