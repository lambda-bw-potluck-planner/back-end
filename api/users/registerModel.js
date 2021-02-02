const db= require("../../data/dbConfig")


function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}

function findBy(filter) {
	return db("users")
		.select("id", "fullName","username", "password", "email")
		.where(filter)
}

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

module.exports={
    findBy,
    add
}