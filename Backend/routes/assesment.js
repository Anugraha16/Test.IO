import express from 'express';
import { createAssessment, getAssessment} from '../controllers/assesment.js';
import {protectRoute} from '../middleware/protectRoute.js'

const router = express.Router();
router.post('/create', createAssessment);

router.get('/:id', getAssessment);

export default router;