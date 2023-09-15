const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Vendor = require("../model/vendor");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

//create vendor
router.post(
    "/create-vendor",
    catchAsyncErrors(async (req, res, next) => {
      try {
        console.log(req.body);
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
          return next(new ErrorHandler("Shop Id is invalid!", 400));
        } else {
        
          const vendorData = req.body;
          vendorData.shop = shop;
  
          const vendor = await Vendor.create(vendorData);
  
          res.status(201).json({
            success: true,
            vendor,
          });
        }
      } catch (error) {
        console.log("Problem Here!!");
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  

  // get all vendors of a shop
router.get(
    "/get-all-vendors-shop/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const vendors = await Vendor.find({ shopId: req.params.id });
  
        res.status(201).json({
          success: true,
          vendors,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  
  // delete vendor of a shop
  router.delete(
    "/delete-shop-vendor/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const vendor = await Vendor.findById(req.params.id);
  
        if (!vendor) {
          return next(new ErrorHandler("Vendor not found with this id", 404));
        }    
      
        await vendor.remove();
  
        res.status(201).json({
          success: true,
          message: "Vendor Deleted successfully!",
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  
  // get all vendors
  router.get(
    "/get-all-vendors",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const vendors = await Vendor.find().sort({ createdAt: -1 });
  
        res.status(201).json({
          success: true,
          vendors,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  module.exports = router;