import gitHabService from '../../src/services/githab';

const validUserName = 'octocat';
const invalidUserName = 'octocatTestData12345';
const emptyUserName = undefined;

const validRepoName = 'git-consortium';
const invalidRepoName = 'TestData12345';

describe('unit tests for gitHabService functions', () => {

    it('getGitHubReposByName return success 200 result', async () => {
        const result =  await gitHabService.getGitHubReposByName(validUserName);
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('getGitHubReposByName return 404 error for not existing user name', async () => {
        const  result = gitHabService.getGitHubReposByName(invalidUserName);
        await expect(result).rejects.toThrow('Request failed with status code 404');
    });

    it('getGitHubReposByName return empty array', async () => {
        const  result = await gitHabService.getGitHubReposByName(emptyUserName);
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBe(0);
    });

    it('getGitHubRepoBranches return success 200 result', async () => {
        const result =  await gitHabService.getGitHubRepoBranches(validUserName, validRepoName);
        expect(result.status).toBe(200);
        expect(result.data);
        expect(result.data.length).toBeGreaterThan(0);
    });

    it('getGitHubRepoBranches return 404 error for not existing user name', async () => {
        const  result = gitHabService.getGitHubRepoBranches(invalidRepoName, validRepoName);
        await expect(result).rejects.toThrow('Request failed with status code 404');
    });

})
