import { Router } from 'express';
import { chatController } from './chat.controller.js';

const router = Router();

// Route for sending chat messages
router.post('/', chatController);

export default router;
