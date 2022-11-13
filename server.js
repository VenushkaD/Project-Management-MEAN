import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(
  express.static(path.resolve(__dirname, './client/dist/project-management'))
);

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

app.get('*', function (request, response) {
  response.sendFile(
    path.resolve(__dirname, './client/dist/project-management', 'index.html')
  );
});

app.listen(process.env.PORT || 3000, '192.168.1.2', () => {
  console.log('Server started on port 3000');
});
