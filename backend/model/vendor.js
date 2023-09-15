const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  address:[
    {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city:{
        type: String,
        required: true,
      },
      address1:{
        type: String,
        required: true,
      },
      zipCode:{
        type: Number,
        required: true,
      },
    }
  ],
  phoneNumber:{
    type: Number,
    required: [true, "Please enter vendors phone number"],
  },
  gst_vendor: {
    type: Number,
    default: 0,
    required: [true, "Please select if vendor has GST"],
  },
  gstNumber: {
    type: String,
  },
  email:{
    type: String,
    required: [true, "Please enter your email!"],
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

module.exports = mongoose.model("Vendor", vendorSchema);
