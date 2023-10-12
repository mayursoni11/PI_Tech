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
    totalGst:{
        type: Number,
        default: 0,
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
    subTotalPrice:{
        type: Number
    },
    shipping:{
        type: Number
    },
    shippigservice:{
        type: String
    },
    discountPrice:{
        type: Number
    },
    paymentterms:{
        type: String,
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
        paidamount:{
            type: Number,
        },
        paidAt:{
            type: Date,
        },
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