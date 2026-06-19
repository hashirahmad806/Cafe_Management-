import express from 'express';
import { getOrders, createOrder, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getOrders);
router.post('/', createOrder);
router.patch('/:id', protect, updateOrderStatus);

export default router;
