import request from 'supertest';
import express from "express";
import bodyParser from 'body-parser';
import routes from "../../src/routes/repositories";

const validUserName = 'octocat';
const invalidUserName = 'octocatTestData12345';

describe('integration tests for routes', () => {

    let server;
    beforeAll(async () => {
        server = express();
        server.use(bodyParser.json());
        // Routes
        //server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        server.use('/', routes);
    });

    it('GET /repositories/{username}  success response with valid username and Accept', done => {
        request(server)
            .get(`/repositories/${validUserName}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.body);
                expect(res.body.length).toBeGreaterThan(0);
                expect(res.body[0].repository_name)
                expect(res.body[0].owner_login)
                expect(res.body[0].branches)
                done();
            });
    });

    it('GET /repositories/{username}  404 error for invalid username', done => {
        request(server)
            .get(`/repositories/${invalidUserName}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.body.status).toBe(404);
                expect(res.body.message).toBe('Not Found');
                done();
            });
    });

    it('GET /repositories/{username}  406 error for invalid Accept', done => {
        request(server)
            .get(`/repositories/${validUserName}`)
            .set('Accept', 'application/xml')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(406)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.body.status).toBe(406);
                expect(res.body.message).toBe(`Unsupported 'Accept' header: application/xml. Must accept 'application/json'`);
                done();
            });
    });


})
