const { select, innerJoin } = require("../../data/dbConfig")
const db= require("../../data/dbConfig")
// GET/users
function getUsers() {
    return db("users").select('*')
}

function getInvites() {
    return db("invitations as i")
    .innerJoin("users as u", "i.organizer", "u.id")
    .innerJoin("potlucks as p","i.potluckId","p.id")  
    .select('i.inviteId','u.username as organizer','i.guest','p.eventName','i.attending')

}

//  GET/users/:id/invitations
function getInvitations(userId) {
    return db("invitations as i")
    .innerJoin("users as u", "i.organizer", "u.id")
    .innerJoin("potlucks as p","i.potluckId","p.id")    
    .select('i.inviteId','u.username as organizer','i.guest','p.eventName','i.attending')
    .where("u.id", userId)
}

//  POST/users/ 
async function addUser(user) {
	const [id] = await db("users").insert(user)
	return getUserById(id)
}
//  POST/users/:id/invitations
// async function addInvitation(invitation) {
//     const [id] = await db('invitations').insert(invitation)
//     return getUserById(id)
// }
function addInvitation(invite, userId) {
    return db("invitations")
        .insert(invite)
        .into("invitations")
        .where("invitations.organizer",userId)
}

//  GET/users/:id/invitations/:inviteId
function getInviteById(organizer,id) {
        return db('invitations as i')
        .innerJoin('users as u', 'i.organizer', 'u.id')
        .innerJoin('potlucks as p', 'i.potluckId', 'p.id')        
        .select('i.inviteId','u.username','i.guest','p.eventName','i.attending')
        .where({'i.inviteId':id,'i.organizer':organizer})  
        .first()
        
}

//  GET/users/:id
function getUserById(id) {
	return db("users")
		.select("id", "fullName", "username","email")
		.where({ id })
		.first()
}

// PUT/users/:id
async function update(id, data) {
	await db("users").where({ id }).update(data)
	return getUserById(id)
}
// DEL/users/:id
function remove(id) {
	return db("users").where({ id }).del()
}


module.exports= {
    getUsers,
    getInvitations,
    getUserById,
    addUser,
    addInvitation,
    getInviteById,
    getInvites,
    update,
    remove
}