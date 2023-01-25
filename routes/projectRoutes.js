import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import {
  createProject,
  getProject,
  getProjects,
  updateProject,
  updateProjectTasks,
} from '../controllers/projectController.js';
import { uploadImage, uploadFiles } from '../firebase.js';

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
  storage: multer.memoryStorage(),
  limits: { fileSize: 3000 * 3000 * 5 },
  // fileFilter: fileFilter,
});

const storageMultiple = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/projects/files');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, uuidv4() + Date.now() + '---' + file.originalname);
  },
});

const uploadFilesMulter = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router
  .route('/')
  .get(getProjects)
  .post(upload.single('projectImage'), uploadImage, createProject);

router
  .route('/:id')
  .get(getProject)
  .patch(upload.single('projectImage'), uploadImage, updateProject);

router
  .route('/task/:id')
  .patch(uploadFilesMulter.array('taskFiles'), uploadFiles, updateProjectTasks);

export default router;
