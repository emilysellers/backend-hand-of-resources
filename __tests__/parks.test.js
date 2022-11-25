const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('parks routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /parks should create a new park', async () => {
    const newPark = {
      //   id: '6',
      name: 'Arbor Lodge',
      state: 'Oregon',
      national_park: false,
    };
    const resp = await request(app).post('/parks').send(newPark);
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '6',
      name: 'Arbor Lodge',
      state: 'Oregon',
      nationalPark: false,
    });
  });

  it('GET /parks/:id should return one park', async () => {
    const resp = await request(app).get('/parks/4');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '4',
      name: 'Grand Staircase-Escalante',
      state: 'Utah',
      nationalPark: true,
    });
  });

  it('GET /parks should return all parks', async () => {
    const resp = await request(app).get('/parks');
    expect(resp.status).toEqual(200);
    expect(resp.body[0]).toEqual({
      id: '1',
      name: 'Glacier',
      state: 'Montana',
      nationalPark: true,
    });
  });

  it('DELETE /parks/:id should delete one existing park', async () => {
    const resp = await request(app).delete('/parks/5');
    expect(resp.status).toBe(200);
    const newResp = await request(app).get('/parks/5');
    expect(newResp.status).toBe(404);
  });

  it('PUT /parks/:id should update one existing park', async () => {
    const resp = await request(app)
      .put('/parks/2')
      .send({ name: 'Kenton Park' });
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Kenton Park',
      state: 'Oregon',
      nationalPark: false,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
