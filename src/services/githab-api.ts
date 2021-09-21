import axios, {AxiosResponse} from "axios";
import log4js from "log4js";
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

async function getGitHubReposByName(userName: string, headers?: any, accountType?: string) {
    logger.info(`Start getGitHubReposByName in github service. Params: userName=${userName}`);
    const gitHubUrl = process.env.GIT_HUB_URL;

    let reqHeaders: object = {};
    if(headers.authorization) reqHeaders['Authorization'] = `token ${headers.authorization}`;
    if(headers.accept) reqHeaders['Accept'] = `${headers.accept}`;

    const result: AxiosResponse = await axios.get(`${gitHubUrl}/${accountType}/${userName}/repos`,
        {
            headers: reqHeaders
        });

    logger.info('End getGitHubReposByName in github service');
    return result;
}

async function getGitHubRepoBranches(userName: string, repoName: string, headers?: any) {
    logger.info(`Start getGitHubRepoBranches in github service. Params: userName=${userName}, repoName=${repoName}`);
    const gitHubUrl = process.env.GIT_HUB_URL;

    let reqHeaders: object = {};
    if(headers.authorization) reqHeaders['Authorization'] = `token ${headers.authorization}`;
    if(headers.accept) reqHeaders['Accept'] = `${headers.accept}`;

    const result: AxiosResponse = await axios.get(`${gitHubUrl}/repos/${userName}/${repoName}/branches`,
        {
            headers: reqHeaders
        });

    logger.info('End getGitHubRepoBranches in github service');
    return result;

}

export = {getGitHubReposByName, getGitHubRepoBranches};