import express from 'express';
import {
  GetProducts,
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
} from '../Controllers/Product.controller.js';

const router = express.Router();

// Test route to check server is working
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'API is working' });
});

// CRUD routes:
router.get('/all', GetProducts);
router.post('/create', CreateProduct);
router.delete('/delete/:id', DeleteProduct);
router.put('/update/:id', UpdateProduct);

export default router;
