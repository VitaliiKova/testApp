import axios, {AxiosResponse} from "axios";

async function getGitHubReposByName(userName: string) {
    const result: AxiosResponse = await axios.get(`https://api.github.com/users/${userName}/repos`);
    return result;
}

async function getGitHubRepoBranches(userName: string, repoName: string) {
    const result: AxiosResponse = await axios.get(`https://api.github.com/repos/${userName}/${repoName}/branches`);
    return result;

}

export = {getGitHubReposByName, getGitHubRepoBranches};