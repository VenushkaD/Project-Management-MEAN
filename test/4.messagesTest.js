import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import User from '../model/User.js';
import sever from '../server.js';
import { getToken } from './common.test.js';
import Message from '../model/Message.js';

const app = server;

chai.use(chaiHttp);

suite('Messages Test', () => {
  let token = null;
  let message = null;
  suiteSetup(async () => {
    message = await Message.create({
      messages: [],
      createdBy: '60a1c1b0b0c1a0a0b0b0b0b0',
    });
    const response = await getToken();
    token = response.body.token;
  });
  test('send a message success', (done) => {
    chai
      .request(app)
      .post('/api/message/' + message._id)
      .set('Authorization', 'Bearer ' + token)
      .send({
        text: 'Test message',
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 200, 'Incorrect status code');
        done();
      });
  });

  test('Creating a message failure', (done) => {
    chai
      .request(app)
      .post('/api/message/60a1c1b0b0c1a0a0b0b0b0b0')
      .set('Authorization', 'Bearer ' + token)
      .send({})
      .end((err, res) => {
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        done();
      });
  });

  test('Get all messages success', (done) => {
    chai
      .request(app)
      .get('/api/message/' + message._id)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        chai.assert.equal(res.status, 200, 'Incorrect status code');
        done();
      });
  });

  suiteTeardown(async () => {
    await Message.deleteMany({});
  });
});
