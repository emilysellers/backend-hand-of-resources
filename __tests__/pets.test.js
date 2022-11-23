const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('pets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /pets should create a new pet', async () => {
    const newPet = {
      name: 'Jets',
      type: 'tortoise',
    };
    const resp = await request(app).post('/pets').send(newPet);
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      name: 'Jets',
      type: 'tortoise',
    });
  });
});
