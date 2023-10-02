const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart:{
        type: Array,
        required: true,
    },
    shippingAddress:{
        type: Object,
        required: true,
    },
    user:{
        type: Object,
        required: true,
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    requestedAmt:{
        type: Number,
        required: true,
        default: 0,
    },
    status:{
        type: String,
        default: "Approval Pending",
    },
    paymentInfo:{
        id:{
            type: String,
        },
        status: {
            type: String,
        },
        type:{
            type: String,
        },
        paymentterms:{
            type: String,
        },
        paidamount:{
            type: Number,
        },
    },
    paidAt:{
        type: Date,
    },
    deliveredAt: {
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Order", orderSchema);