const express = require("express")
const { createNewRole, updateRole } = require("../controllers/roles")
const rolesRouter = express.Router()
rolesRouter.post("/",createNewRole)
rolesRouter.put("/",updateRole)
module.exports = rolesRouter