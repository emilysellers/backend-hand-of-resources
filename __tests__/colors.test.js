const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('colors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it.only('GET /colors should return a list of colors', async () => {
    const res = await request(app).get('/colors');
    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: '1',
      colorName: 'Maroon',
      hexColor: '#800000',
    });
  });
  it('POST /colors should create a new color', async () => {
    const newColor = {
      color_name: 'Crimson',
      hex_color: '#dc143c',
    };
    const res = await request(app).post('/colors').send(newColor);
    expect(res.status).toEqual(200);
    // (contorller turns SQL object into JS object here)
    expect(res.body).toEqual({
      id: expect.any(String),
      colorName: expect.any(String),
      hexColor: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
