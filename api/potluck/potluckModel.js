const db= require("../../data/dbConfig")

// GET/potlucks
function getPotlucks() {
    return db("potlucks").select("*")
}
// GET/potlucks/:id/items
function getItems(potluckId) {
    return db('itemsList as i')
    .innerJoin('potlucks as p', 'i.potluckId', 'p.id')
    .innerJoin('users as u', 'i.organizer', 'u.id')
    .where('p.id', potluckId) 
    .select('i.id', 'p.eventName', 'u.username', 'i.item' )
}
// POST/potlucks
async function addPotluck(potluck) {
	const [id] = await db("potlucks").insert(potluck)
	return getPotluckById(id)
}

// GET/potlucks/:id
function getPotluckById(id) {
	return db("potlucks")
		.select("id", "eventName", "date", "time", "address" )
		.where({ id })
		.first()
}

//  POST/potlucks/:id/items
async function addItem(item, potluckId) {
    // const [id] = await db('users_potlucks').insert(item)
    // return getPotluckById(id)
    return db("itemsList")
    // .innerJoin('invitations as i', 'up.attendee', 'i.invitee')
    // .innerJoin('users as u', 'up.organizer', 'u.username')
    // .innerJoin('potlucks as p', 'up.potluckId', 'p.id')
    .insert(item)
    .into("itemsList")
    .where("itemsList.potluckId",potluckId)
}
function findItems(id) {
    return db("itemsList")
    .select('*')
    .where({id})
    .first()
}
//  GET/potlucks/:id/items/:id
async function getItemById(potluckId, itemId) {
    
        return db('itemsList as i')
        .innerJoin('potlucks as p', 'i.potluckId', 'p.id')
        .innerJoin('users as u', 'i.organizer', 'u.id')
        .where('p.id', potluckId) 
        .select('i.id', 'p.eventName', 'u.username', 'i.item' )
        .where('i,id',itemId)

    
}

// PUT/potlucks/:id
async function update(id, data) {
	await db("potlucks").where({ id }).update(data)
	return getPotluckById(id)
}
// DEL/potlucks/:id
function remove(id) {
	return db("potlucks").where({ id }).del()
}

module.exports= {
    getPotlucks,
    getItems,
    addPotluck,
    getPotluckById,
    addItem,
    getItemById,
    update,
    remove,
    findItems
}