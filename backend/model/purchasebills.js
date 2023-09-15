const mongoose = require("mongoose");

const purchasebillSchema = new mongoose.Schema({

    shopId : {
        type : String,
        required: true,
    },   

    vendorId : {
        type : String,
        required: true,
    },

    purchaseInvNo : {
        type: String,
        required: [true, "Please provide purchase invoice number"],
    },

    paymentStatus: {
        type: String,
        required: true,
    },

    totalBillAmt: {
        type: Number,
        required: true,
        default: 0,
    },

    totalPaidAmt: {
        type: Number,
        required: true,
        default: 0,
    },

    totalPendingAmt: {
        type: Number,
        required: true,
        default: 0,
    },

    transactions: [
        {
        paidAmt : {
            type: Number,
            default: 0,
        },
        paidOn :{
            type: Date,
            default: Date.now(),
        }
        }
    ],

    items : [
        {
            mproductId : {
                type : String,
                required: true,
            },
            quantity : {
                type: Number,
                required: true,
            },
            rate: {
                type: Number,
                required: true,
            },
            gstRate:{
                type: Number,
                default: 0
            },
            gstAmt : {
                type: Number,
                default: 0
            },
            totalAmt : {
                type: Number,
                required: true,
            }
        }
    ]

});

module.exports = mongoose.model("PurchaseBill", purchasebillSchema);