import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product';

const router = Router();

router.get('/api/products', getAllProducts);
router.get('/api/products', getProductById);
router.post('/api/products', createProduct);
router.put('/api/products', updateProduct);
router.delete('/api/products', deleteProduct);

export default router;
