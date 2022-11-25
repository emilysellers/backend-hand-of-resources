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

  it('DELETE /pets/:id should delete one existing pet', async () => {
    const resp = await request(app).delete('/pets/3');
    expect(resp.status).toEqual(200);
    const newResp = await request(app).get('/pets/3');
    expect(newResp.status).toBe(404);
  });

  it('PUT /pets/:id should update one existing pet', async () => {
    const resp = await request(app).put('/pets/4').send({ name: 'Dragon' });
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '4',
      name: 'Dragon',
      type: 'hamster',
    });
  });
});
