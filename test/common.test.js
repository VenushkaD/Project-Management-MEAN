import supertest from 'supertest';
import express from 'express';
const request = supertest(express);
import app from '../server.js';
import User from '../model/User.js';

const defaultUser = {
  name: 'test',
  email: 'test@gmail.com',
  password: 'secret',
};

const createUser = async () => {
  await User.deleteMany({});
  const UserModel = new User(defaultUser);
  await UserModel.save();
};

export const getToken = async () => {
  await createUser();
  return supertest(app)
    .post('/api/auth/login')
    .send({
      email: 'test@gmail.com',
      password: 'secret',
    })
    .expect(200);
};
