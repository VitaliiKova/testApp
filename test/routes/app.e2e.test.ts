import request from 'supertest';
import express from "express";
import bodyParser from 'body-parser';

import {errorHandler} from "../../src/middleware/error";

describe('e2e tests for app routes', () => {

    let server;
    beforeAll(async () => {
        server = express();
        server.use(bodyParser.json());
        // Routes
        server.get('/', (req, res) => {
            res.send('Hello World!');
        });
        server.get('/health', (req, res) => {
            res.send('Healthy!');
        });
        /** Error handling */
        server.use(errorHandler);
    });

    it('GET /  success response for root', done => {
        request(server)
            .get(`/`)
            .expect(200)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.text).toBe('Hello World!');
                done();
            });
    });

    it('GET /health  success response for health route', done => {
        request(server)
            .get(`/health`)
            .expect(200)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.text).toBe('Healthy!');
                done();
            });
    });




})
