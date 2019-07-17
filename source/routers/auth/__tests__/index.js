// Core
const request = require('supertest');

// Instruments
const { app } = require('../../../server');
let server = request(app);
let credentials = null;

describe('should handle login post request', () => {
    test('should return 204 for login', async (done) => {
        const response = await server.post('/api/login').send({ password: '123456', email: 'jdoe@email.com'});

        expect(response.statusCode).toBe(204);
        done();
    });
});

describe('should handle logout post request', () => {
    beforeAll(async (done) => {
        const response = await server.post('/api/login').send({ password: '123456', email: 'jdoe@email.com' });

        const [ source ] = response.headers[ 'set-cookie' ][ 0 ].split(';');
        credentials = source;

        done();
    });
    test('should return 204 for logout', async (done) => {
        const response = await server.post('/api/logout').set('Cookie', credentials);
        expect(response.statusCode).toBe(204);
        done();
    });
});
