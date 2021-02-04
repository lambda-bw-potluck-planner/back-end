const db= require("../../data/dbConfig")

// GET/potlucks
function getPotlucks() {
    return db("potlucks").select("*")
}

// GET/ItemsList
function getItemsList() {
    return db("itemsList as i")
    .innerJoin('potlucks as p', 'i.potluckId', 'p.id')
    .innerJoin('users as u', 'i.organizer', 'u.id')
    .select('i.id', 'p.eventName', 'u.username as organizer', 'i.item' )

}
// GET/potlucks/:id/items
function getItems(potluckId) {
    return db('itemsList as i')
    .innerJoin('potlucks as p', 'i.potluckId', 'p.id')
    .innerJoin('users as u', 'i.organizer', 'u.id')
    .where('p.id', potluckId) 
    .select('i.id', 'p.eventName', 'u.username as organizer', 'i.item' )
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
    return db("itemsList")
    .insert(item)
    .into("itemsList")
    .where("itemsList.potluckId",potluckId)
}

//  GET/potlucks/:id/itemsList/:itemId
function getItemById(potluckId, id) {
        return db('itemsList as i')
        .innerJoin('potlucks as p', 'i.potluckId', 'p.id')
        .innerJoin('users as u', 'i.organizer', 'u.id')
        .where({'i.id':id,'i.potluckId':potluckId})  
        .select('i.id', 'p.eventName', 'u.username as organizer', 'i.item' )
        .first()

    
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

// POST/potluck/:id/guests
function addGuest(potluckId,guestData) {
    return db('guests as g')
    .insert(guestData)
    .into('guests')
    .where('g.potluckId',potluckId)
    .innerJoin('potlucks as p','g.potluckId','p.id')
    .innerJoin('itemsList as it','g.itemId','it.id')
    .innerJoin('invitations as iv','g.InvitationId','iv.inviteId')
    .select('p.eventName','iv.guest','it.item')
    }
// GET/potluck/:id/guests
function getGuests(potluckId) {
    return db('guests as g')
    .innerJoin('potlucks as p','g.potluckId','p.id')
    .innerJoin('itemsList as it','g.itemId','it.id')
    .innerJoin('invitations as iv','g.InvitationId','iv.inviteId')
    .where({'g.potluckId':potluckId})
    .select('p.eventName','iv.guest','it.item')
    

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
    getItemsList,
    addGuest,
    getGuests
    
}