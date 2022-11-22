const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe.skip('colors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /colors should return a list of colors', async () => {
    const res = await request(app).get('/colors');
    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: '1',
      colorName: 'Maroon',
      hexColor: '#800000',
    });
  });

  it('GET /colors/:id should return one color', async () => {
    const res = await request(app).get('/colors/3');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: '3',
      colorName: 'Yellow',
      hexColor: '#ffff00',
    });
  });

  it('POST /colors should create a new color', async () => {
    const newColor = {
      color_name: 'Crimson',
      hex_color: '#dc143c',
    };
    const res = await request(app).post('/colors').send(newColor);
    expect(res.status).toEqual(200);
    // (controller turns SQL object into JS object here)
    expect(res.body).toEqual({
      id: expect.any(String),
      colorName: expect.any(String),
      hexColor: expect.any(String),
    });
  });

  it('DELETE /colors/:id should delete one existing color', async () => {
    const resp = await request(app).delete('/colors/2');
    expect(resp.status).toBe(200);

    const colorResp = await request(app).get('/colors/2');
    expect(colorResp.status).toBe(404);
  });

  it('PUT /colors/:id should update one existing color', async () => {
    const resp = await request(app)
      .put('/colors/9')
      .send({ colorName: 'amber' });
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '9',
      colorName: 'amber',
      hexColor: '#000000',
    });
    // expect(resp.body.colorName).toBe('amber');
  });

  afterAll(() => {
    pool.end();
  });
});
