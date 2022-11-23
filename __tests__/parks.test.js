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

  afterAll(() => {
    pool.end();
  });
});
