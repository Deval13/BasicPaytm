const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const {authorizeUser} = require("../middleware/userAuthentication")
const { Account } =  require('../db');

router.get('/balance', authorizeUser, async(req, res) => {
    const userId = req.userId
    const account = await Account.findOne({ userId: userId })
    res.status(200).json({balance:account.balance})
})

router.post("/transfer", authorizeUser, async (req ,res) => {
    const session = await mongoose.startSession()
    
    session.startTransaction()
    const { amount, to } = req.body
    
    const account = await Account.findOne({ userId: req.userId }).session(session);
    
    if (!account || account.balance < parseInt(amount)) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient Balance Or account not found"
        });
    }

    const toAccount = await Account.find({ userId: to }).session(session);
    
    if (!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({
            msg: "Reciever Account not found !!"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -parseInt(amount) } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: parseInt(amount) } }).session(session);
    
    await session.commitTransaction();

    res.json({
        msg: "Transfer Successfull  !! "
    });
})

module.exports = router
