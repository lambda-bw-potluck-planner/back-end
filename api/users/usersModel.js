const { select } = require("../../data/dbConfig")
const db= require("../../data/dbConfig")
// GET/users
function getUsers() {
    return db("users").select("id", "fullName", "username","email")
}
//  GET/users/:id/invitations
function getInvitations(userId) {
    return db("invitations as inv")
    .innerJoin("users as u", "inv.inviter", "u.id")
    .innerJoin("potlucks as p","inv.potluckId","p.id")
    .where("u.id", userId)
    .select("inv.id", "inv.inviter as inviter", "inv.invitee as invitee", "p.id as potluckId", "inv.attending")
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
        .where("invitations.inviter",userId)
}

//  GET/users/:id/invitations/:id
async function getInviteById(userId) {
    const [id]= await db('users').getInvitations(userId)
    return db("invitations as i")
    .select('*')
    // .innerJoin('potlucks as p', 'i.potluckId', 'p.id')
    // .select("i.id", "i.inviter", "i.invitee","p.id", 'i.attending')
    .where({ 'i.id': id })
    .first()
}

//  GET/users/:id
function getUserById(id) {
	return db("users")
		.select("id", "fullName", "username","email")
		.where({ id })
		.first()
}

module.exports= {
    getUsers,
    getInvitations,
    getUserById,
    addUser,
    addInvitation,
    getInviteById
}