import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../server.js';
import Project from '../model/Project.js';
import User from '../model/User.js';
import mongoose from 'mongoose';
import { getToken } from './common.test.js';
import Mocha from 'mocha';

chai.use(chaihttp);
const response = await getToken();
let token = response.body.token;

suite('**********Test Project Routes*************', () => {
  const app = server;
  let project = null;

  suiteSetup((done) => {
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
        project = res.body.project;
        done();
      });
  });

  test('create project all details present', async () => {
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
      });
  });

  test('create project title not present ', async () => {
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
      });
  });

  test('create project description not present ', async () => {
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
      });
  });

  test('create project dueDate not present ', async () => {
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
      });
  });

  test('get all projects', async () => {
    chai
      .request(app)
      .get('/api/project')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        chai.assert.equal(res.status, 200, 'Incorrect status code');
      });
  });

  test('get project by id', async () => {
    chai
      .request(app)
      .get('/api/project/' + project._id)
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        chai.assert.equal(res.status, 200, 'Incorrect status code');
      });
  });

  test('get project by id not found', async () => {
    chai
      .request(app)
      .get('/api/project/' + mongoose.Types.ObjectId())
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        chai.assert.equal(res.status, 404, 'Incorrect status code');
      });
  });

  test('update project by id', async () => {
    chai
      .request(app)
      .patch('/api/project/' + project._id)
      .set('Authorization', 'Bearer ' + token)
      .send({
        title: 'New Project',
        description: 'Lorem asdfgsgasgszxvxzvzxvzxvzxvxzvzvzxvzxvzxvzvzx',
        dueDate: '2023-10-02',
      })
      .end(async (err, res) => {
        chai.assert.equal(res.status, 200, 'Incorrect status code');
        await Project.deleteMany({});
      });
  });

  suiteTeardown(async () => {
    await Project.deleteMany({});
  });
});
