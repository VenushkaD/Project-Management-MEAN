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
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(
  express.static(path.resolve(__dirname, './client/dist/project-management'))
);

app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

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

app.get('/api/users', (req, res) => {
  console.log(req.query.search);

  const users = [
    { id: '1001', email: 'john@gmail.com' },
    { id: '1003', email: 'nimal@gmail.com' },
    { id: '1004', email: 'kamal@gmail.com' },
    { id: '1005', email: 'sunimal@gmail.com' },
    { id: '1006', email: 'gayan@gmail.com' },
    { id: '1007', email: 'oliver@gmail.com' },
    { id: '1002', email: 'vdhambarage@gmail.com' },
    { id: '1008', email: 'barry@gmail.com' },
    { id: '1009', email: 'queen@gmail.com' },
  ];
  const filteredUsers = users.filter((user) => {
    if (user.email.includes(req.query.search)) {
      return user;
    }
  });
  res.json({ msg: 'success', data: { users: filteredUsers } });
});

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);

app.get('*', function (request, response) {
  response.sendFile(
    path.resolve(__dirname, './client/dist/project-management', 'index.html')
  );
});

const init = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(process.env.PORT || 3000, async () => {
      console.log('Server started on port 3000');
    });
  } catch (error) {
    console.log(error);
  }
};

init();

export default app;
