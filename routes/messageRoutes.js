import express from 'express';
import {
  createMessage,
  getMessages,
} from '../controllers/messageController.js';

const router = express.Router();

router.route('/:projectId').post(createMessage).get(getMessages);

export default router;
