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
  suiteSetup(async () => {
    await User.deleteMany({});
  });
  test('Test Post /api/auth (Register)', (done) => {
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
        done();
      });
  });
  test('Test Post /api/auth (Register), name not provided', (done) => {
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
        done();
      });
  });
  test('Test Post /api/auth (Register), email not provided', (done) => {
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
        done();
      });
  });
  test('Test Post /api/auth (Register), password not provided', (done) => {
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
        done();
      });
  });
  test('Test Post /api/auth (Register), password length less than 6', (done) => {
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
        done();
      });
  });
  test('Test Post /api/auth (Register), email not valid', (done) => {
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
        done();
      });
  });
  test('Test Post /api/auth (Register), name length less than 3', (done) => {
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
        done();
      });
  });
  test('Test Post /api/auth (Login)', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'secret',
      })
      .end((err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 200, 'Incorrect status code');
        chai.assert.equal(body.msg, 'success', 'Incorrect message');
        done();
      });
  });
  test('Test Post /api/auth (Login) invalid credentials', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@gmail.com',
        password: 'secret22',
      })
      .end((err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 401, 'Incorrect status code');
        chai.assert.equal(body.msg, 'Invalid credentials', 'Incorrect message');
        done();
      });
  });
  test('Test Post /api/auth (Login) load test', async () => {
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
