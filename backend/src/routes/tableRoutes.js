import express from 'express';
import { getTables, updateTable } from '../controllers/tableController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getTables);
router.put('/:id', protect, updateTable);

export default router;
