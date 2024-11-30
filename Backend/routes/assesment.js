import express from 'express';
import { createAssessment, getAssessment} from '../controllers/assesment.js';
import {protectRoute} from '../middleware/protectRoute.js'
import { checkStudentAccess} from '../middleware/checkStudent.js';

const router = express.Router();
router.post('/create',createAssessment);

router.get('/:id', protectRoute(["Student"]),checkStudentAccess,getAssessment);

export default router;