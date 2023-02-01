import authMiddleware from '../middleware/auth.js';
import chai from 'chai';
import { getToken } from './common.test.js';
import mockResponse from 'mock-express-response';
import User from '../model/User.js';
import Message from '../model/Message.js';
let token = null;
const response = await getToken();
token = response.body.token;

suite('***********Test Auth Middleware Unit test**************', () => {
  test('Correct token provided', () => {
    const req = {
      headers: {
        authorization: 'Bearer ' + token,
      },
    };
    const res = {};
    const next = () => {};
    authMiddleware(req, res, next);
    chai.expect(req.user).to.be.an('object');
    chai.expect(req.user).to.have.property('id');
    chai.expect(req.user).to.have.property('email');
  });

  test('Incorrect token provided', () => {
    const req = {
      headers: {
        authorization: 'Bearer ' + 'token',
      },
    };
    const res = new mockResponse();
    const next = () => {};
    authMiddleware(req, res, next);
    chai.expect(req.user).to.be.undefined;
    chai.assert.equal(res.statusCode, 401, 'Incorrect status code');
    chai.assert.equal(
      res._getJSON().message,
      'Invalid token',
      'Incorrect message'
    );
  });

  suiteTeardown(async () => {
    await User.deleteMany({});
  });
});
