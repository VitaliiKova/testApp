import axios, {AxiosResponse} from "axios";
import log4js from "log4js";
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

async function getGitHubReposByName(userName: string) {
    logger.info(`Start getGitHubReposByName in githab service. Params: userName=${userName}`);
    const result: AxiosResponse = await axios.get(`https://api.github.com/users/${userName}/repos`);
    logger.info('End getGitHubReposByName in githab service');
    return result;
}

async function getGitHubRepoBranches(userName: string, repoName: string) {
    logger.info(`Start getGitHubRepoBranches in githab service. Params: userName=${userName}, repoName=${repoName}`);
    const result: AxiosResponse = await axios.get(`https://api.github.com/repos/${userName}/${repoName}/branches`);
    logger.info('End getGitHubRepoBranches in githab service');
    return result;

}

export = {getGitHubReposByName, getGitHubRepoBranches};