const express = require("express")
const users = require("../controllers/users")
const usersRouter = express.Router()
usersRouter.post("/register",users.register)
usersRouter.post("/login",users.login)
usersRouter.get("/",users.getAllUsers)
usersRouter.get("/students",users.getAllStudents)
usersRouter.delete("/:id",users.activateUser)
module.exports = usersRouter