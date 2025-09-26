const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

//CRUD
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Inventory management routes
router.post('/products/:id/increase-stock', productController.increaseStock);
router.post('/products/:id/decrease-stock', productController.decreaseStock);

//Low Stock Route
router.get('/low-stock-products', productController.getLowStockProducts);

module.exports = router;