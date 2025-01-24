const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const { User, Account} = require("../db");
const { JWT_SECRET } = require("../config");
const { userValidation } = require("../inputvalidator/userInputValidator")
const zod = require('zod');
const { authorizeUser } = require("../middleware/userAuthentication")


router.get("/bulk", authorizeUser, async(req, res) => {
    const users = await User.find({})
    console.log("users are " + users);
    console.log(typeof users);
    
     res.status(200).json({
         msg: 'users',
         user: users.map((user) => {
             return {
                 username: user.username,
                 firstName: user.firstName,
                 id : user._id
              }    
            })
        })
    
})

router.post("/signup",  async (req, res) => {
    const { success } = userValidation.safeParse(req.body)
    if (!success) {
        res.status(411).json(
            {
                message: "Incorrect Inputs "
            }
        )
    }
    
    const user = await User.findOne({
        username : req.body.username
    })

    if (user) {
        res.status(411).json({
            msg: "User already exists"
        })
    }

    // creating user as it doesn't exist in the database
    console.log("backend username " + req.body.username);
    
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName : req.body.lastName
    })

    const userId = newUser._id;
    console.log(newUser);
    console.log("user id is " + userId);
    const balance = parseInt(1 + (Math.random() * 10000))
    console.log("balance is " + balance);

    await Account.create({
        userId: userId,
        balance: balance
    })

    console.log("account and user is created !!");

    const jwtToken = jwt.sign({ userId }, JWT_SECRET)
    
    res.status(200).json({
        message: "New user is created ",
        token: "Bearer "+ jwtToken
    })
    
})

const bodyValidator = zod.object({
    username: zod.string().email(),
    password : zod.string()
})
router.post("/signin", async(req, res) => {
    const { success } = bodyValidator.safeParse(req.body)

    if (!success) {
        res.status(411).json(
            {
                message: "Incorrect Inputs "
            }
        )
    }

    const user = await User.findOne({
        username: req.body.username
    })
    
    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET)
        res.status(200).json({
            msg: "User signed in successfully",
            token : "Bearer "+ token
        })
    }

    res.status(411).json(
        {
            message: "Incorrect Inputs "
        }
    )
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/",authorizeUser, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    
    if (!success) {
        res.status(403).json({msg:"Incorrect Inputs !!!"})
    }
    console.log(req.userId);
    await User.updateOne( {
        _id :  req.userId
    }, req.body)
    
    res.status(200).json({msg:"Update Successfull !!"})
})  

router.get("/filter",authorizeUser , async(req, res) => {
    const filterword = req.query.filter || ""
    console.log(filterword);
    const filterUser = await User.find({
       // //$or will run the query on firstName and lastName for all user for filterword
        $or: [{
            firstName: {
                "$regex": filterword , "$options": "i"
            }
        },
            {
                lastName: {
                "$regex": filterword , "$options": "i"
            }
        }]
        
    })

    console.log("users from database are " + filterUser);
    res.json({
        user: filterUser.map(user => {
            console.log(user);
            return{
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        })
    })
})

module.exports = router


/* "message": "New user is created ",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk3YzNhYWQxNWI5YjgxZTRiNmE3MTkiLCJpYXQiOjE3MjEyMjIwNTh9.nYVHHOkSvWJ6rUJxWg4Z9NAIrMdjf-Mvo_syhgK5EMk" 
    

    {
    "message": "New user is created ",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk3YzNmNGQxNWI5YjgxZTRiNmE3MWUiLCJpYXQiOjE3MjEyMjIxMzJ9.4lLFQvmLfUmkuEA2YtJmGb7aNQB43SeHUwHlvYTkQqE"
    }

    {
    "message": "New user is created ",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk3YzQ0NWQxNWI5YjgxZTRiNmE3MjMiLCJpYXQiOjE3MjEyMjIyMTN9.VI6aquvmpqhqS9tXkAhIIxxNwmp_N6aL0cXzImZyEh0"
    }

    {
    "msg": "User signed in successfully",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk3YzQ0NWQxNWI5YjgxZTRiNmE3MjMiLCJpYXQiOjE3MjEyMjI0MjN9.eoOrnkCF7D6JAJwBLAzlIbBok6WobArXWUj7I2FlEb0"
    }
*/
