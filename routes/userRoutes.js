import express from 'express';
import { getUsers, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import { upload } from '../image-upload/storage.js';
import { uploadImage } from '../firebase.js';

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .patch(authMiddleware, upload.single('userImage'), uploadImage, updateUser);

export default router;
