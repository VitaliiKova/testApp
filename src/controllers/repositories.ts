import {Request, Response, NextFunction} from 'express';
import axios, {AxiosResponse} from 'axios';
import configs from '../configs/config';
import gitHabService from '../services/githab';


// getting all repositories
export const getRepos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check accept type in header
        if (configs.BAD_ACCEPT_TYPES.includes(req.headers.accept)) {
            return res.status(406).json({
                status: 406,
                message: `Unsupported 'Accept' header: ${req.headers.accept}. Must accept 'application/json'`
            });
        }


        let result: object[] = [];
        // get the user name from the req.params
        const userName: string = req.params.username;
        // getting all repositories by userName
        const allRepos: AxiosResponse = await gitHabService.getGitHubReposByName(userName);

        // filtering all repositories
        if (allRepos && allRepos.data && allRepos.data.length) {
            let oneRepo: any;
            for (oneRepo of allRepos.data) {
                // filtering not fork repo
                if (oneRepo.fork === false && oneRepo.name) {
                    // get branches for repo
                    const branchesResult: AxiosResponse = await gitHabService.getGitHubRepoBranches(userName, oneRepo.name);
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

        return res.status(200).json(result);

    } catch (error) {
        if (error && error.isAxiosError) {
            return res.status(error.response.status).json({
                status: error.response.status,
                message: error.response.statusText
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }
};

export default {getRepos};