import chai from 'chai';
import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import sinon from 'sinon';

suite('**********User functions test**********', () => {
  test('Hash password', async () => {
    await User.deleteMany({});
    const user = await User.create({
      email: 'test@gmail.com',
      password: 'testpassword',
      name: 'test',
    });
    chai.assert.notEqual(user.password, 'testpassword');
  });
  test('Password Match', async () => {
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const mockDoc = new User({
      password: hashedPassword,
    });
    const output = await mockDoc.matchPassword('testpassword');
    chai.assert.equal(output, true);
  });
  test('Password incorrect', async () => {
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const mockDoc = new User({
      password: hashedPassword,
    });
    const output = await mockDoc.matchPassword('incorrectpassword');
    chai.assert.equal(output, false);
  });
  test('Create token', async () => {
    const mockDoc = new User({
      _id: '123456789',
      email: 'test@gmail.com',
      password: 'secret',
    });
    const output = await mockDoc.createToken();
    chai.expect(output).to.be.a('string');
  });

  suiteTeardown(async () => {
    await User.deleteMany({});
  });
});
