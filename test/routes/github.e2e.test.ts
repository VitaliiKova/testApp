import request from 'supertest';
import express from "express";
import bodyParser from 'body-parser';
import routes from "../../src/routes/repositories";
import mockData from '../mock-data';
import dotenv from "dotenv";
import {errorHandler} from "../../src/middleware/error";

describe('e2e tests for github routes', () => {

    let server;
    beforeAll(async () => {
        dotenv.config();
        server = express();
        server.use(bodyParser.json());
        // Routes
        server.use('/', routes);
        /** Error handling */
        server.use(errorHandler);
    });

    it('GET /repositories/{accountType}/{username}  success response with valid username and Accept for USER', done => {
        request(server)
            .get(`/repositories/${mockData.accountTypeUser}/${mockData.validUserName}`)
            .set('Accept', mockData.headers.acceptValid)
            .set('Authorization', mockData.headers.authorizationTokenValid)
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

    it('GET /repositories/{accountType}/{username}  404 error for invalid username for USER', done => {
        request(server)
            .get(`/repositories/${mockData.accountTypeUser}/${mockData.invalidUserName}`)
            .set('Accept', mockData.headers.acceptValid)
            .set('Authorization', mockData.headers.authorizationTokenValid)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.body.status).toBe(404);
                expect(res.body.Message).toBe('Not Found');
                done();
            });
    });

    it('GET /repositories/{accountType}/{username}  406 error for invalid Accept for USER', done => {
        request(server)
            .get(`/repositories/${mockData.accountTypeUser}/${mockData.validUserName}`)
            .set('Accept', mockData.headers.acceptInvalid)
            .set('Authorization', mockData.headers.authorizationTokenValid)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(406)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.body.status).toBe(406);
                expect(res.body.Message).toBe(`Unsupported 'Accept' header: application/xml. Must accept 'application/json'`);
                done();
            });
    });

    it('GET /repositories/{accountType}/{username}  success response with valid username and Accept for an ORGANIZATION', done => {
        request(server)
            .get(`/repositories/${mockData.accountTypeOrgs}/${mockData.validOrgName}`)
            .set('Accept', mockData.headers.acceptValid)
            .set('Authorization', mockData.headers.authorizationTokenValid)
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

    it('GET /repositories/{accountType}/{username}  404 error for invalid username for an ORGANIZATION', done => {
        request(server)
            .get(`/repositories/${mockData.accountTypeOrgs}/${mockData.invalidOrgName}`)
            .set('Accept', mockData.headers.acceptValid)
            .set('Authorization', mockData.headers.authorizationTokenValid)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.body.status).toBe(404);
                expect(res.body.Message).toBe('Not Found');
                done();
            });
    });

    it('GET /repositories/{accountType}/{username}  406 error for invalid Accept for an ORGANIZATION', done => {
        request(server)
            .get(`/repositories/${mockData.accountTypeOrgs}/${mockData.validOrgName}`)
            .set('Accept', mockData.headers.acceptInvalid)
            .set('Authorization', mockData.headers.authorizationTokenValid)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(406)
            .end((err, res) => {
                if (err) throw new Error(err.message);
                expect(res.body.status).toBe(406);
                expect(res.body.Message).toBe(`Unsupported 'Accept' header: application/xml. Must accept 'application/json'`);
                done();
            });
    });


})
