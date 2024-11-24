const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/productSave', productController.productSave);
router.get('/productAll', productController.getAllProducts);
router.put('/edit/:id', productController.editProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
