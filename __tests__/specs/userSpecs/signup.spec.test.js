import { faker } from '@faker-js/faker';
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import bcrypt from 'bcrypt';
import supertest from 'supertest';

import app from '../../../app.js';
import Users from '../../../models/users.model.js';
import { sequelize } from '../../../db.js';

describe('Users', () => {
  let superTestApp;

  beforeAll(() => {
    superTestApp = supertest(app);
    return sequelize.sync();
  });

  beforeEach(async () => {
    // await Users.sync({ force: true });
    return Users.destroy({ truncate: true });
  });

  describe('User registration', () => {
    describe('given the username and password are valid', () => {
      it('it should return a 201 code and message', async () => {
        const response = await superTestApp.post('/auth/signup').send({
          username: faker.person.fullName(),
          password: 'password',
        });

        const userList = await Users.findAll();
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toEqual('Account created successfully');
        expect(userList.length).toBe(1);
      });

      it('comparing the hashedPassword with plainPassword to check bcrypt functionality', async () => {
        const userPayload = {
          username: faker.person.fullName(),
          password: 'password',
        };
        await superTestApp.post('/auth/signup').send({
          username: userPayload.username,
          password: userPayload.password,
        });
        const [user] = await Users.findAll({
          where: { username: userPayload.username },
        });
        const { hashedPassword } = user;
        const passwordMatch = await bcrypt.compare(
          userPayload.password,
          hashedPassword,
        );
        expect(passwordMatch).toBeTruthy();
      });
      describe('if Username already exists', () => {
        it('it should return 409', async () => {
          const userPayload = {
            username: 'abhiram Kantipudi',
            password: 'password',
          };
          await superTestApp.post('/auth/signup').send(userPayload);
          const response = await superTestApp
            .post('/auth/signup')
            .send(userPayload);
          expect(response.statusCode).toBe(409);
          expect(response.body.error).toEqual('Username already exists');
        });
      });
      describe('if an error occurs during account creation', () => {
        it('it should return 500 ', async () => {
          const userPayload = {
            username: faker.person.fullName(),
            hashedPassword: 'hashed_password',
          };
          const mockCreate = jest.spyOn(Users, 'create');
          mockCreate.mockRejectedValue(new Error('Test error'));
          const response = await superTestApp.post('/auth/signup').send({
            username: userPayload.username,
            password: userPayload.hashedPassword,
          });
          await expect(Users.create(userPayload)).rejects.toThrow(Error);
          expect(response.status).toBe(500);
          expect(response.body.error).toEqual('Internal Server Error');

          mockCreate.mockRestore();
        });
      });
    });
  });
});
