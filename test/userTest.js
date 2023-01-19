import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../server.js';
import User from '../model/User.js';

chai.use(chaihttp);

suite('Test Server User Routes', () => {
  const app = server;
  setup(async () => {
    // Create any objects that we might need
    await User.deleteMany({});
  });
  test('Test Post /api/auth (Register)', () => {
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
        process.exit();
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
      .end((err, res) => {
        const body = res.body;
        chai.assert.equal(res.status, 200, 'Incorrect status code');
        chai.assert.equal(body.msg, 'success', 'Incorrect message');
        process.exit();
      });
  });
});
