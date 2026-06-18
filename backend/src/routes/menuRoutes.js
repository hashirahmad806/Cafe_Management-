import express from 'express';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getMenuItems);
router.post('/', protect, createMenuItem);
router.put('/:id', protect, updateMenuItem);
router.delete('/:id', protect, deleteMenuItem);

export default router;
