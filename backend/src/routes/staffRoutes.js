import express from 'express';
import { getStaff, addStaff, deleteStaff } from '../controllers/staffController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getStaff);
router.post('/', protect, addStaff);
router.delete('/:id', protect, deleteStaff);

export default router;
