const { select, innerJoin } = require("../../data/dbConfig")
const db= require("../../data/dbConfig")
// GET/users
function getUsers() {
    return db("users").select("id", "fullName", "username","email")
}

function getInvites() {
    return db("invitations as i")
    .innerJoin("users as u", "i.inviter", "u.id")
    .innerJoin("potlucks as p","i.potluckId","p.id")  
    .select('i.id','u.username as organizer','i.invitee','p.eventName','i.attending')

}

//  GET/users/:id/invitations
function getInvitations(userId) {
    return db("invitations as i")
    .innerJoin("users as u", "i.inviter", "u.id")
    .innerJoin("potlucks as p","i.potluckId","p.id")    
    .select('i.id','u.username as organizer','i.invitee','p.eventName','i.attending')
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
        .where("invitations.inviter",userId)
}

//  GET/users/:id/invitations/:inviteId
function getInviteById(inviter,id) {
        return db('invitations as i')
        .innerJoin('users as u', 'i.inviter', 'u.id')
        .innerJoin('potlucks as p', 'i.potluckId', 'p.id')        
        .select('i.id','u.username','i.invitee','p.eventName','i.attending')
        .where({'i.id':id,'i.inviter':inviter})  
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
    getInviteById,
    getInvites
}