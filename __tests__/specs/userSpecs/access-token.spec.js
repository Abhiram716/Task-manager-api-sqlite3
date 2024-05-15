import { faker } from '@faker-js/faker';
import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
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
  });
});
