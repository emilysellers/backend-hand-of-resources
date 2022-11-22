const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('sharks routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /sharks should list all sharks', async () => {
    const res = await request(app).get('/sharks');
    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: '1',
      commonName: 'Goblin shark',
      distinctiveFeature: 'catapulting snout',
      lengthFt: '13',
    });
  });

  it('GET /sharks/:id should return one shark', async () => {
    const res = await request(app).get('/sharks/1');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: '1',
      commonName: 'Goblin shark',
      distinctiveFeature: 'catapulting snout',
      lengthFt: '13',
    });
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
      id: '6',
      commonName: 'Horn shark',
      distinctiveFeature: 'ridges along the eyes',
      lengthFt: '4',
    });
  });

  it('PUT /sharks/:id should update one existing shark', async () => {
    const resp = await request(app)
      .put('/sharks/3')
      .send({ commonName: 'Friendly shark' });
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '3',
      commonName: 'Friendly shark',
      distinctiveFeature: 'flattened body and a broad, rounded head',
      lengthFt: '10',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
