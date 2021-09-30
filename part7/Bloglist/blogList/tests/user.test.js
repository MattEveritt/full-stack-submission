const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")
const initialUsers = [
 {
  username: "Matthias",
  name: "Matty Everitt",
  password: "scooby",
 },
 {
  username: "Mikey",
  name: "Michael Scott",
  password: "scotty",
 },
]

beforeEach(async () => {
 await User.deleteMany({})
 let userObject = new User(initialUsers[0])
 await userObject.save()
 userObject = new User(initialUsers[1])
 await userObject.save()
})

describe("testing username provided and each case doesnt save invalid user", () => {
 test("fails with status code 400 username must be atleast 3 characters", async () => {
  const newUser = {
   username: "me",
   name: "Matthias Everitt",
   password: "matt",
  }

  await api
   .post("/api/users")
   .send(newUser)
   .expect(400)
   .expect("Content-Type", /application\/json/)

  const usersAtEnd = await api.get("/api/users")
  expect(usersAtEnd.body).toHaveLength(initialUsers.length)
 })

 test("fails with status code 400 username is missing", async () => {
  const newUser = {
   name: "Matthias Everitt",
   password: "matt",
  }

  await api
   .post("/api/users")
   .send(newUser)
   .expect(400)
   .expect("Content-Type", /application\/json/)

  const usersAtEnd = await api.get("/api/users")
  expect(usersAtEnd.body).toHaveLength(initialUsers.length)
 })
})

describe("testing username provided and each case doesnt save invalid user", () => {
 test("fails with status code 400 password must be atleast 3 characters", async () => {
  const newUser = {
   username: "matt",
   name: "Matthias Everitt",
   password: "me",
  }

  await api
   .post("/api/users")
   .send(newUser)
   .expect(400)
   .expect("Content-Type", /application\/json/)

  const usersAtEnd = await api.get("/api/users")
  expect(usersAtEnd.body).toHaveLength(initialUsers.length)
 })

 test("fails with status code 400 password is missing", async () => {
  const newUser = {
   username: "matt",
   name: "Matthias Everitt",
  }

  await api
   .post("/api/users")
   .send(newUser)
   .expect(400)
   .expect("Content-Type", /application\/json/)

  const usersAtEnd = await api.get("/api/users")
  expect(usersAtEnd.body).toHaveLength(initialUsers.length)
 })
})

afterAll(() => {
 mongoose.connection.close()
})
