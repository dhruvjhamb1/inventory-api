const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock_quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    low_stock_threshold: {
        type: Number,
        required: true,
        min: 0,
        default: 10
    }
}, {
    timestamps: true,
    versionKey: false
});

// Custom validation to ensure stock_quantity doesn't go below zero
productSchema.path('stock_quantity').validate(function(value) {
    return value >= 0;
}, 'Stock quantity cannot be negative');

const Product = mongoose.model('Product', productSchema);

module.exports = Product;