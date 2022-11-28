import express from 'express';
import { getUsers, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware.js/auth.js';
import { upload } from '../image-upload/storage.js';

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .patch(authMiddleware, upload.single('userImage'), updateUser);

export default router;
