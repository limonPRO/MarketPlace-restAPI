const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User')
const ProductController = require('../controllers/Product')
const OrderController = require('../controllers/Order')
const PaymentController = require('../controllers/Payment')

const auth = require('../middileware/auth')

router.post('/registration',UserController.registration) ;
router.post('/login',UserController.login) ;

router.post('/create-product',ProductController.postProducts);
// router.post('/updat-product/:id')
router.get('/products',ProductController.getProducts)
// router.get('/product/:id')


router.post('/orders',auth,OrderController.makeOrders)
router.get('/orders',OrderController.getOrders)

router.post('/make-payment',auth ,PaymentController.orderPayment)
router.get('/paymets',PaymentController.getPayment)

module.exports = router;