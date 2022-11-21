const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('sharks routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /sharks should create a new shark', async () => {
    const newShark = {
      common_name: 'Horn shark',
      distinctive_feature: 'ridges along the eyes',
      length_ft: '4',
    };
    const res = await request(app).post('/sharks').send(newShark);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      commonName: expect.any(String),
      distinctiveFeature: expect.any(String),
      lengthFt: expect.any(String),
      // id: '6',
      // commonName: 'Horn shark',
      // distinctiveFeature: 'ridges along the eyes',
      // lengthFt: '4',
    });
  });
  afterAll(() => {
    pool.end();
  });
});
