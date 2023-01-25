import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../server.js';
import User from '../model/User.js';

chai.use(chaihttp);

suite('***********Test Server Authentication Routes**************', () => {
  const app = server;
  setup(async () => {
    // Create any objects that we might need
  });
  test('Test Post /api/auth (Register)', async () => {
    await User.deleteMany({});
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@gmail.com',
        password: 'secret',
      })
      .end((err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 201, 'Incorrect status code');
        chai.assert.equal(body.msg, 'success', 'Incorrect message');
      });
  });
  test('Test Post /api/auth (Register), name not provided', async () => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@gmail.com',
        password: 'secret',
      })
      .end((err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        chai.assert.equal(
          body.msg,
          'Please provide all values',
          'Incorrect message'
        );
      });
  });
  test('Test Post /api/auth (Register), email not provided', async () => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@gmail.com',
        password: 'secret',
      })
      .end((err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        chai.assert.equal(
          body.msg,
          'Please provide all values',
          'Incorrect message'
        );
      });
  });
  test('Test Post /api/auth (Register), password not provided', async () => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@gmail.com',
      })
      .end((err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        chai.assert.equal(
          body.msg,
          'Please provide all values',
          'Incorrect message'
        );
      });
  });
  test('Test Post /api/auth (Register), password length less than 6', async () => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@gmail.com',
        password: 'secr',
      })
      .end((err, res) => {
        const body = res.body;
        console.log(body);
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        chai.assert.equal(
          body.msg,
          'Password must be at least 6 characters',
          'Incorrect message'
        );
      });
  });
  test('Test Post /api/auth (Register), email not valid', async () => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@gma',
        password: 'secret',
      })
      .end((err, res) => {
        const body = res.body;
        console.log(body);
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        chai.assert.equal(
          body.msg,
          'Please provide a valid email',
          'Incorrect message'
        );
      });
  });
  test('Test Post /api/auth (Register), name length less than 3', async () => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        name: 'te',
        email: 'test@gmail.com',
        password: 'secret',
      })
      .end((err, res) => {
        const body = res.body;
        console.log(body);
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        chai.assert.equal(
          body.msg,
          'Name must be at least 3 characters',
          'Incorrect message'
        );
      });
  });
  test('Test Post /api/auth (Login)', () => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'secret',
      })
      .end(async (err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 200, 'Incorrect status code');
        chai.assert.equal(body.msg, 'success', 'Incorrect message');
      });
  });
  test('Test Post /api/auth (Login) invalid credentials', () => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'secret22',
      })
      .end(async (err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        chai.assert.equal(body.msg, 'Invalid credentials', 'Incorrect message');
      });
  });
  test('Test Post /api/auth (Login) load test', () => {
    for (let i = 0; i < 100; i++) {
      chai
        .request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@gmail.com',
          password: 'secret',
        })
        .end(async (err, res) => {
          const body = res.body;
          chai.assert.equal(res.status, 200, 'Incorrect status code');
          chai.assert.equal(body.msg, 'success', 'Incorrect message');
        });
    }
  });
});
