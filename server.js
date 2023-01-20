import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import connect from './db/connect.js';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import authMiddleware from './middleware.js/auth.js';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(
  express.static(path.resolve(__dirname, './client/dist/project-management'))
);

app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));

if (process.env.NODE_ENV?.trim() !== 'production') {
  app.use(morgan('dev'));
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  io.emit('message', 'Socket-io connection success');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET',
    'POST',
    'DELETE',
    'PATCH',
    'OPTIONS'
  );
  next();
});

app.get('/api', (req, res) => {
  res.json({ msg: 'api' });
});

app.use('/api/user', authMiddleware, userRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/project', authMiddleware, projectRoutes);

app.get('*', function (request, response) {
  response.sendFile(
    path.resolve(__dirname, './client/dist/project-management', 'index.html')
  );
});

const port = process.env.PORT || 3000;

const init = async () => {
  try {
    await connect();
    server.listen(port, () => {
      console.log('Server started on port ' + port);
    });
  } catch (error) {
    console.log(error);
  }
};

init();

export default app;
//change
