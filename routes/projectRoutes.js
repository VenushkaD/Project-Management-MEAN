import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, uuidv4() + Date.now() + '.' + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = file.mimetype.split('/')[1];
  if (ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png') {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000 * 3000 * 5 },
  fileFilter: fileFilter,
});

import {
  createProject,
  getProjects,
} from '../controllers/projectController.js';

const router = express.Router();

router
  .route('/')
  .get(getProjects)
  .post(upload.single('projectImage'), createProject);

export default router;
