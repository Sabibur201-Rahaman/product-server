const express=require('express')
const UserController=require('../controllers/UsersController')
const ProductController=require('../controllers/ProductController')
const AuthVerifyMiddleware=require('../middleware/AuthVerifyMiddleware')
const router=express.Router()

// use

router.post("/registration",UserController.registration);
router.post("/login",UserController.login);
router.post("/profileUpdate",AuthVerifyMiddleware,UserController.profileUpdate);
router.get("/profileDetails",AuthVerifyMiddleware,UserController.profileDetails);

// Product
router.post("/createProduct",AuthVerifyMiddleware,ProductController.createProduct);
router.post("/updateProductStats/:id",AuthVerifyMiddleware,ProductController.updateProductStats);
router.post("/deleteProduct/:id",AuthVerifyMiddleware,ProductController.deleteProduct);
router.get("/listProductByBrand/:brand",AuthVerifyMiddleware,ProductController.listProductByBrand);
router.get("/listProductByCategory/:category",AuthVerifyMiddleware,ProductController.listProductByCategory);
router.get("/productsBrandCounts",AuthVerifyMiddleware,ProductController.productsBrandCounts);
router.get("/productsCategoryCounts",AuthVerifyMiddleware,ProductController.productsCategoryCounts);
module.exports=router;