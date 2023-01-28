import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import User from '../model/User.js';

chai.use(chaiHttp);

suite('Messages Test', () => {
  //   test('Creating a message success', () => {
  //     chai
  //       .request(app)
  //       .post('/api/message/60a1c1b0b0c1a0a0b0b0b0b0')
  //       .send({
  //         text: 'Test message',
  //       })
  //       .end((err, res) => {
  //         chai.assert.equal(res.status, 201, 'Incorrect status code');
  //       });
  //   });
  // test('Register success', () => {
  //   chai
  //     .request(app)
  //     .post('/api/auth/register')
  //     .send({
  //       name: 'test',
  //       email: 'test1@gmail.com',
  //       password: 'secret',
  //     })
  //     .end((err, res) => {
  //       chai.assert.equal(res.status, 201, 'Incorrect status code');
  //     });
  // });
});

//get -Read , post - Add, put - Update, delete - Delete
