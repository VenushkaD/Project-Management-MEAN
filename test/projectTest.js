import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../server.js';
import Project from '../model/User.js';
import User from '../model/User.js';
import mongoose from 'mongoose';
import { getToken } from './common.test.js';
import Mocha from 'mocha';

chai.use(chaihttp);

let token = null;
const response = await getToken();
token = response.body.token;

suite('**********Test Project Routes (Add Project)*************', () => {
  const app = server;

  test('All details present', (done) => {
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
        chai.assert.equal(res.status, 201, 'Incorrect status code');
        done();
      });
  });

  test('Title not present ', (done) => {
    chai
      .request(app)
      .post('/api/project')
      .set('Authorization', 'Bearer ' + token)
      .send({
        description: 'Lorem asdfgsgasgszxvxzvzxvzxvzxvxzvzvzxvzxvzxvzvzx',
        dueDate: '2023-10-02',
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        done();
      });
  });

  test('description not present ', (done) => {
    chai
      .request(app)
      .post('/api/project')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'New Project',
        dueDate: '2023-10-02',
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        done();
      });
  });

  test('dueDate not present ', (done) => {
    chai
      .request(app)
      .post('/api/project')
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'New Project',
        description: 'Lorem asdfgsgasgszxvxzvzxvzxvzxvxzvzvzxvzxvzxvzvzx',
      })
      .end((err, res) => {
        chai.assert.equal(res.status, 400, 'Incorrect status code');
        done();
      });
  });
});
