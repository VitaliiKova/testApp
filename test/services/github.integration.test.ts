import gitHabService from '../../src/services/githab-api';
import mockData from '../mock-data'
import dotenv from "dotenv";

describe('Integration tests for gitHabService functions', () => {

    beforeAll(async () => {
        dotenv.config();
    });

    it('getGitHubReposByName return success 200 result for USER', async () => {
        const result = await gitHabService.getGitHubReposByName(mockData.validUserName, {
                accept: mockData.headers.acceptValid,
                authorization: mockData.headers.authorizationTokenValid
            },
            mockData.accountTypeUser
        );
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('getGitHubReposByName return 404 error for not existing user name for USER', async () => {
        const result = gitHabService.getGitHubReposByName(mockData.invalidUserName, {
                accept: mockData.headers.acceptValid,
                authorization: mockData.headers.authorizationTokenValid
            },
            mockData.accountTypeUser
        );
        await expect(result).rejects.toThrow('Request failed with status code 404');
    });

    it('getGitHubReposByName return empty array for USER', async () => {
        const result = await gitHabService.getGitHubReposByName(mockData.emptyUserName, {
                accept: mockData.headers.acceptValid,
                authorization: mockData.headers.authorizationTokenValid
            },
            mockData.accountTypeUser
        );
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBe(0);
    });

    it('getGitHubRepoBranches return success 200 result for USER', async () => {
        const result = await gitHabService.getGitHubRepoBranches(mockData.validUserName, mockData.validRepoName, {
            accept: mockData.headers.acceptValid,
            authorization: mockData.headers.authorizationTokenValid
        });
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('getGitHubRepoBranches return 404 error for not existing user name for USER', async () => {
        const result = gitHabService.getGitHubRepoBranches(mockData.invalidUserName, mockData.validRepoName, {
            accept: mockData.headers.acceptValid,
            authorization: mockData.headers.authorizationTokenValid
        });
        await expect(result).rejects.toThrow('Request failed with status code 404');
    });

    it('getGitHubReposByName return success 200 result for an ORGANIZATION', async () => {
        const result = await gitHabService.getGitHubReposByName(mockData.validOrgName, {
                accept: mockData.headers.acceptValid,
                authorization: mockData.headers.authorizationTokenValid
            },
            mockData.accountTypeOrgs
        );
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('getGitHubReposByName return 404 error for not existing user name for an ORGANIZATION', async () => {
        const result = gitHabService.getGitHubReposByName(mockData.invalidOrgName, {
                accept: mockData.headers.acceptValid,
                authorization: mockData.headers.authorizationTokenValid
            },
            mockData.accountTypeOrgs
        );
        await expect(result).rejects.toThrow('Request failed with status code 404');
    });

    it('getGitHubReposByName return empty array for an ORGANIZATION', async () => {
        const result = await gitHabService.getGitHubReposByName(mockData.emptyOrgName, {
                accept: mockData.headers.acceptValid,
                authorization: mockData.headers.authorizationTokenValid
            },
            mockData.accountTypeUser
        );
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBe(0);
    });

    it('getGitHubRepoBranches return success 200 result for an ORGANIZATION', async () => {
        const result = await gitHabService.getGitHubRepoBranches(mockData.validOrgName, mockData.validRepoNameOrg, {
            accept: mockData.headers.acceptValid,
            authorization: mockData.headers.authorizationTokenValid
        });
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('getGitHubRepoBranches return 404 error for not existing user name for an ORGANIZATION', async () => {
        const result = gitHabService.getGitHubRepoBranches(mockData.invalidOrgName, mockData.validRepoNameOrg, {
            accept: mockData.headers.acceptValid,
            authorization: mockData.headers.authorizationTokenValid
        });
        await expect(result).rejects.toThrow('Request failed with status code 404');
    });

})
