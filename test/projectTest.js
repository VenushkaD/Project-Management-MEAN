import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../server.js';
import Project from '../model/User.js';
import User from '../model/User.js';
import mongoose from 'mongoose';

chai.use(chaihttp);

suite('Test Server Project Routes', () => {
  const app = server;
  setup(async () => {
    // Create any objects that we might
    mongoose.connect(process.env.MONGO_URL_TEST);
    // await Project.deleteMany({});
  });

  test('Test Post /api/project (Add Project)', async () => {
    await User.deleteMany({});
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        name: 'test',
        email: 'test@gmail.com',
        password: 'secret',
      })
      .end(async (err, res) => {
        const body = res.body;
        token = body.token;
        chai.assert.equal(res.status, 201, 'Incorrect status code');
        chai.assert.equal(body.msg, 'success', 'Incorrect message');
        chai.assert.isNotNull(token, 'Token is null');

        chai
          .request(app)
          .post('/api/project')
          .set('Authorization', 'Bearer ' + token)
          .send({
            title: 'New Project',
            description: 'Lorem asdfgsgasgszxvxzvzxvzxvzxvxzvzvzxvzxvzxvzvzx',
            dueDate: '2023-10-02',
          })
          .end((err, res) => {
            const body = res.body;
            console.log(body);
            chai.assert.equal(res.status, 201, 'Incorrect status code');
            process.exit();
          });
      });
  });
});
