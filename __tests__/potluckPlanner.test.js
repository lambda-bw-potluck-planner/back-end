const request = require("supertest")
const server = require("../api/server")
const db= require("../data/dbConfig")
const register=require('../api/users/registerModel')
const login=require('../api/users/loginModel')
const users=require('../api/users/usersModel')
// to get authorization

describe('POST to register user', ()=>{
    test("checks the status code", async () => {
      await db('users').truncate()
        const res = await request(server).post("/register").send({
            fullName:"jae",
            username:"j",
            password:"brownie",
            email:"yahoo"
        })
        expect(res.status).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("j")
    }) 
})

describe('POST to login user', ()=>{
    test("returns login message", async () => {
      await db('users')
        const res = await request(server).post("/login").send({
            username:"j",
            password:"brownie"
        })
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe('Welcome, j!')
    }) 
})

describe('GET to show list of users in database', ()=>{
    test('returns the 401 if not authorized', async()=>{
        const res= await request(server).get('/users')
        expect(res.status).toBe(401)
    })
   
})

describe('Get to Potlucks endpoint', () => {
    test('returns error message for not having jwt', async()=>{
        const res= await request(server).get('/potlucks')
        expect(res.body.message).toBe('token required')
    })
})

