import reposService from '../../src/services/repositories';
import mockData from '../mock-data'
import {AxiosResponse} from "axios";
import dotenv from 'dotenv';

const reposValid: AxiosResponse = {
    data: mockData.repos,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    request: {}
};

const reposInvalid: AxiosResponse = {
    data: [],
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config: {},
    request: {}
};

describe('Unit tests for repos functions', () => {

    beforeAll(async () => {
        dotenv.config();
    });

    it('makeReposToOutputFormat return success format with branches', async () => {
        const result = await reposService.makeReposToOutputFormat( reposValid, mockData.validUserName, { accept: mockData.headers.acceptValid });
        expect(result.length).toBeGreaterThan(0);
        // @ts-ignore
        expect(result[0].repository_name);
        // @ts-ignore
        expect(result[0].owner_login);
        // @ts-ignore
        expect(result[0].branches);
        // @ts-ignore
        expect(result[0].branches.length);
        // @ts-ignore
        expect(result[0].branches[0].name);
        // @ts-ignore
        expect(result[0].branches[0].commit_sha);
    });

    it('makeReposToOutputFormat return empty result', async () => {
        const result = await reposService.makeReposToOutputFormat( reposInvalid, mockData.validUserName, { Accept: mockData.headers.acceptValid });
        expect(result.length).toBe(0);
    });

})
