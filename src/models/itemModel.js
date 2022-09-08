const mongoose = require('mongoose')

const MenuSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "Veg",
        required: true
    },
    availability: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Menu', MenuSchema)