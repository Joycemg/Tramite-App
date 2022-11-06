import { Router } from 'express';
import { signIn, logIn } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', signIn);
router.post('/login', logIn);

export default router;
