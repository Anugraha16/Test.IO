import express from 'express';

import { createOrganization } from '../controllers/adminPrivilege.js';
import { createCourse } from '../controllers/adminPrivilege.js';

const router = express.Router();


router.post('/create-org', createOrganization);
router.post('/create-course', createCourse)

export default router;
