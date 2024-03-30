const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required : true
    }
})

module.exports = mongoose.model('cart', CartSchema);