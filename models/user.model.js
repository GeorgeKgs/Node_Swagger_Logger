const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const Schema = mongoose.Schema


const validateEmail = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(email)
}

let addressSchema = new Schema({
    area: {type: String},
    road: {type: String}
}, {_id: false})

let phoneSchema = new Schema({
    type: {type: String},
    number: {type: String}
}, {_id: false})

let productSchema = new Schema({
    product: {type: String},
    cost: {type: Number},
    quantity: {type: Number},
    date: {type: Date, default: Date.now}
}, {_id: false})


let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        max: 100
    },
    name: {
        type: String,
        max: 100
    },
    surname: {
        type: String,
        max: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        max: 100,
        trim: true,
        unique: true,
        lowercase: true,
        //validate: [validateEmail, 'Email address is not valid']
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is not valid']
    },
    address: addressSchema,
    phone: {type: [phoneSchema], null: true},
    products: {type: [productSchema], null: true} 
}, {
    collection: 'Users',
    timestamps: true
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)