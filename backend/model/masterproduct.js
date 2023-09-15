const mongoose = require("mongoose");

const masterProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  stock:{
    type: Number,
    default: 0,
  },
  gst_product: {
    type: Number,
    default: 0,
    required: [true, "Please select if product has GST"],
  },
  hsn_sac:{
    type: Number,
  },
  gstrate: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("MasterProduct", masterProductSchema);
