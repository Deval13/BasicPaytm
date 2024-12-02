
const express = require("express");
const app = express()
// const Router = express.Router()
const cors = require('cors');
app.use(cors())
app.use(express.json());
const userRouter = require("./routes/index")

app.use("/api/v1", userRouter)

app.listen(3000)



