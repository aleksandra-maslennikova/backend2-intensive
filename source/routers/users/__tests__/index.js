// Core
const request = require('supertest');

// Instruments
const { app } = require('../../../server');
let server = request(app);
let credentials = null;

const user = {
    name:     'sasha',
    email:    'email@mail.com',
    phone:    '12344555',
    password: '123',
    sex:      'f',
};

describe('should handle get request', () => {
    beforeAll(async (done) => {
        const response = await server
            .post('/api/login')
            .send({ password: '123456', email: 'jdoe@email.com' });

        const [ source ] = response.headers[ 'set-cookie' ][ 0 ].split(';');
        credentials = source;

        done();
    });

    test('should return 200', async (done) => {
        const response = await server.get('/api/users').set('Cookie', credentials);
        expect(response.statusCode).toBe(200);
        done();
    });

    test('should return correct headers', async (done) => {
        const response = await server.get('/api/users').set('Cookie', credentials);
        const contentType = response.headers[ 'content-type' ];

        expect(contentType).toMatch('application/json');
        done();
    });

    test('should return an array', async (done) => {
        const response = await server.get('/api/users').set('Cookie', credentials);
        const {
            body: { data },
        } = response;
        expect(Array.isArray(data)).toBe(true);
        done();
    });
});

describe('should handle post request', () => {
    beforeAll(async (done) => {
        const response = await server
            .post('/api/login')
            .send({ password: '123456', email: 'jdoe@email.com' });

        const [ source ] = response.headers[ 'set-cookie' ][ 0 ].split(';');
        credentials = source;

        done();
    });

    test('should return 201', async (done) => {
        const response = await server
            .post('/api/users')
            .send(user)
            .set('Cookie', credentials);
        expect(response.statusCode).toBe(201);
        done();
    });

    test('should return correct headers', async (done) => {
        const response = await server
            .post('/api/users')
            .send(user)
            .set('Cookie', credentials);
        const contentType = response.headers[ 'content-type' ];
        expect(contentType).toMatch('application/json');
        done();
    });

    test('should return an object', async (done) => {
        const response = await server
            .post('/api/users')
            .send(user)
            .set('Cookie', credentials);
        const {
            body: { data },
        } = response;
        expect(typeof data === 'object').toBe(true);
        done();
    });
});