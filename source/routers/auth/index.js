// Core
import express from 'express';

// Instruments
import { login, logout } from './route';
import { limiter, authenticate } from '../../utils';

export const router = express.Router();

router.post('/login', [ authenticate, limiter(5, 60 * 1000) ], login);
router.post('/logout', [ limiter(5, 60 * 1000) ], logout);

export { router as auth };
