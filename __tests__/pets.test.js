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

  it('GET /pets/:id should return one pet', async () => {
    const resp = await request(app).get('/pets/2');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'BMO',
      type: 'collie',
    });
  });

  it('GET /pets should return all pets', async () => {
    const resp = await request(app).get('/pets');
    expect(resp.status).toEqual(200);
    expect(resp.body[0]).toEqual({
      id: '1',
      name: 'Garbanzo',
      type: 'terrier',
    });
  });
});
