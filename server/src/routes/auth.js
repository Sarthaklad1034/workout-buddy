import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validate.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/verify/:token', verify);

export default router;