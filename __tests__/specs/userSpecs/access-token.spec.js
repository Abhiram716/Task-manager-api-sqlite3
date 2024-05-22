import { faker } from '@faker-js/faker';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';

import app from '../../../app.js';
import { sequelize } from '../../../db.js';
import Users from '../../../models/users.model.js';

describe('Access Tokens', () => {
  let superTestApp;
  beforeAll(() => {
    superTestApp = supertest(app);
    return sequelize.sync();
  });

  beforeEach(async () => Users.destroy({ truncate: true }));
  describe('User Login', () => {
    describe('given the username and password', () => {
      it('it should return 404 if username is not present in DB', async () => {
        const response = await superTestApp.post('/auth/acess-token').send({
          username: faker.person.fullName(),
          password: 'dummy_password',
        });
        expect(response.status).toBe(404);
        expect(response.body.error).toEqual('Account not found');
      });
    });
    describe('Given valid username and invalid password', () => {
      it('it should return status code 401', async () => {
        const userPayload = {
          username: faker.person.fullName(),
          password:
            '$2a$10$4lchl78gxaMPDOQ.mfy9uemZDZ46ITQS8UMc3hJkd32W6lzxiHzly',
        };
        await Users.create({
          username: userPayload.username,
          hashedPassword: userPayload.password,
        });
        const response = await superTestApp.post('/auth/acess-token').send({
          username: userPayload.username,
          password: 'invalid_password',
        });
        expect(response.status).toBe(401);
        expect(response.body.error).toEqual('Invalid password');
      });
    });
    describe('Given Valid username and valid password', () => {
      beforeAll(() => {
        let accessToken;
        let mockUser = {
          dataValues: {
            id: faker.string.uuid(),
            username: faker.person.fullName(),
            hashedPassword: bcrypt.hashSync('password', 10),
          },
        };
        Users.findOne = jest.fn().mockResolvedValue(mockUser);
        jwt.sign = jest.fn().mockImplementation(() => {
          accessToken = 'mocked access token';
          return accessToken;
        });
      });
      afterAll(() => {
        Users.findOne = jest.fn().mockReset();
        jwt.sign = jest.fn().mockReset();
      });
      it('it should return status code 200 and access token', async () => {
        const response = await superTestApp.post('/auth/acess-token').send({
          username: faker.person.fullName(),
          password: 'password',
        });
        console.log(response.error);
        expect(response.status).toBe(200);
        expect(response.body.accessToken).toBeDefined();
      });
    });
    describe('if an error occurs during account creation', () => {
      it('it should return 500 ', async () => {
        const userPayload = {
          username: faker.person.fullName(),
          password: 'hashed_password',
        };
        const mockFindOne = jest.spyOn(Users, 'findOne');
        mockFindOne.mockRejectedValue(new Error('Test error'));

        const response = await superTestApp.post('/auth/acess-token').send({
          username: userPayload.username,
          password: userPayload.password,
        });
        await expect(Users.findOne(userPayload)).rejects.toThrow(Error);
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual('Internal Server Error');

        mockFindOne.mockRestore();
      });
    });
  });
});
