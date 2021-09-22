import axios, {AxiosResponse} from "axios";
import gitHubService from './githab-api'
import log4js from "log4js";
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;


async function makeReposToOutputFormat(allRepos: AxiosResponse, userName: string, headers?: any) {
    logger.info(`Start makeReposToOutputFormat in repositories service.`);

    let result: object[] = [];

    if (allRepos && allRepos.data && allRepos.data.length) {
        let oneRepo: any;
        for (oneRepo of allRepos.data) {
            // filtering not fork repo
            if (oneRepo.fork === false && oneRepo.name) {
                // get branches for repo
                // in failed request case, we will catch it in common error handler
                const branchesResult: AxiosResponse = await gitHubService.getGitHubRepoBranches(userName, oneRepo.name, headers);
                let branches: object[] = [];
                if (branchesResult && branchesResult.data && branchesResult.data.length) {
                    branches = branchesResult.data.map(i => {
                        return {
                            name: i.name,
                            commit_sha: i.commit && i.commit.sha ? i.commit.sha : null
                        }
                    })
                }
                // push filtered repo to result
                result.push({
                    repository_name: oneRepo.name,
                    owner_login: oneRepo.owner && oneRepo.owner.login ? oneRepo.owner.login : null,
                    branches: branches
                })
            }
        }
    }

    logger.info('End makeReposToOutputFormat in repositories service');
    return result;
}

export = {makeReposToOutputFormat};