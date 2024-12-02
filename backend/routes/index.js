const express = require('express');
// const app = express()
const Router = express.Router()
const UserRouter = require("./user")
const AccountRouter = require("./account")

Router.use("/user" , UserRouter)
Router.use("/account" , AccountRouter)

module.exports = Router