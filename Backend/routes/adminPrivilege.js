import express from 'express';

import { createOrganization, getCourse, getOrganization, createCourse } from '../controllers/adminPrivilege.js';

const router = express.Router();


router.post('/create-org', createOrganization);
router.post('/create-course', createCourse)

router.get('/get-org', getOrganization);
router.get('/get-course', getCourse);

export default router;
