const request = require('supertest');
const { describe, it } = require('mocha');
const app = require('./api');
const assert = require('assert');
describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app)
                      .get('/contact')
                      .expect(200);
      assert.deepStrictEqual(response.text, 'contact us page');
    })
  });

  describe('/', () => {
    it('should request an inexustent route /hi and redirect to hello', async () => {
      const response = await request(app)
                      .get('/hi')
                      .expect(200);
      assert.deepStrictEqual(response.text, 'Hello World');
    })
  })

  describe('/login', () => {
    it('should login success on the login route and return status 200', async () => {
      const response = await request(app)
                      .post('/login')
                      .send({ username: 'Leo', password: '123' })
                      .expect(200);
      assert.deepStrictEqual(response.text, 'Login success!');
    })
    it('should unauthorized using wrong credentials and return status 401', async () => {
      const response = await request(app)
                      .post('/login')
                      .send({ username: 'Xablau', password: '123' })
                      .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, 'Logging failed');
    })
  })
})