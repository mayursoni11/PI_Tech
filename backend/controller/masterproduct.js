const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const MasterProduct = require("../model/masterproduct");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");

//create master product
router.post(
    "/create-master-product",
    catchAsyncErrors(async (req, res, next) => {
      try {
        console.log(req.body);
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
          return next(new ErrorHandler("Shop Id is invalid!", 400));
        } else {
        
          const mproductData = req.body;
          mproductData.shop = shop;
  
          const masterProduct = await MasterProduct.create(mproductData);
  
          res.status(201).json({
            success: true,
            masterProduct,
          });
        }
      } catch (error) {
        console.log("Problem Here!!");
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  

  // get all master products of a shop
router.get(
    "/get-all-mproduct-shop/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const mproducts = await MasterProduct.find({ shopId: req.params.id });
  
        res.status(201).json({
          success: true,
          mproducts,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  
  // delete vendor of a shop
  router.delete(
    "/delete-shop-mproduct/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const mproduct = await MasterProduct.findById(req.params.id);
  
        if (!mproduct) {
          return next(new ErrorHandler("Product not found with this id", 404));
        }    
      
        await mproduct.remove();
  
        res.status(201).json({
          success: true,
          message: "Product Deleted successfully!",
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  
  // get all vendors
  router.get(
    "/get-all-mproducts",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const mproducts = await MasterProduct.find().sort({ createdAt: -1 });
  
        res.status(201).json({
          success: true,
          mproducts,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  module.exports = router;