const mongoose = require('mongoose');
const { number } = require('zod');

mongoose.connect("mongodb+srv://devdadeval13:M4bpSFLNjezp6Wgd@cluster0.jdx96kj.mongodb.net/paytm")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique : true,
        maxLength: 30,
        trim: true,
        lowercase : true
    },

    password: {
        type: String,
        minLength: 6,
        required : true
    },

    firstName: {
        type: String,
        minLength: 3,
        required: true,
        trim : true
    },
    lastName: {
        type: String,
        required : true,
        trim : true
    }
})

const AccountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required:true        
    }
})

const User = mongoose.model('User', UserSchema)
const Account = mongoose.model("Account" , AccountSchema)

module.exports = {
    User,
    Account
}