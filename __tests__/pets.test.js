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
      id: '6',
      name: 'Jets',
      type: 'tortoise',
    });
  });

  it('GET /pets should return all pets', async () => {
    const res = await request(app).get('/pets');
    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: '1',
      name: 'Garbanzo',
      type: 'terrier',
    });
  });
});
