const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('colors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('POST /colors should create a new color', async () => {
    const newColor = {
      color_name: 'Crimson',
      hex_color: '#dc143c',
    };
    const res = await request(app).post('/colors').send(newColor);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newSoda,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
