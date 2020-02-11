'use strict'

const request = require('supertest');

const app = require('./server').app;


const assert = require('assert');

it('Should create a Math Operation and return 201', (done) => {
    let mathOperation = {
        username: 'Test',
        math_operation: '9+9',
        result: '18'
    }

    request(app).post('/mathOperation')
        .send(mathOperation)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(done)
});


it('Should return 401 BadRequest when no math_operation is provided', (done) => {
    let mathOperation = {
        username: 'Test',
        result: '18'
    }

    request(app).post('/mathOperation')
        .send(mathOperation)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done)
});

it('Should return 401 BadRequest when no result is provided', (done) => {
    let mathOperation = {
        username: 'Test',
        math_operation: '9+9'
    }

    request(app).post('/mathOperation')
        .send(mathOperation)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done)
});

it('Should return 401 BadRequest when no username is provided', (done) => {
    let mathOperation = {
        math_operation: '9+9',
        result: '18'
    }

    request(app).post('/mathOperation')
        .send(mathOperation)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done)
});

it('Should get the response object with object information', (done) => {
    request(app).get('/mathOperation')
        .expect(200)
        .end(function (err, result) {
            let body = result.body;
            assert(!isNaN(body.currentPage));
            assert(!isNaN(body.totalPages));
            assert(!isNaN(body.pageSize));
            assert(!isNaN(body.count));

            assert(body.data.length > 0);
            done();
        });
});
