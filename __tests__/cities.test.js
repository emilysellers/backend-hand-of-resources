const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cities routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /cities should return all cities', async () => {
    const newCity = {
      city_name: 'Vancouver',
      country: 'Canada',
    };
    const res = await request(app).post('/cities').send(newCity);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      cityName: 'Vancouver',
      country: 'Canada',
    });
  });

  it('GET /cities/:id should return one existing city', async () => {
    const res = await request(app).get('/cities/5');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: '5',
      cityName: 'Alcoy',
      country: 'Spain',
    });
  });

  it('GET /cities should return all cities', async () => {
    const res = await request(app).get('/cities');
    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: '1',
      cityName: 'Seattle',
      country: 'USA',
    });
  });
});
