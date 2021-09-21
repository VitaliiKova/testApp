import {Request, Response, NextFunction} from 'express';
import axios, {AxiosResponse} from 'axios';
import gitHubService from '../services/githab-api';
import reposService from '../services/repositories';
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;


// getting all repositories
export const getRepos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('Start getRepos in repositories controller');

        // get all the necessary data from the request
        const headers = req.headers;
        const userName: string = req.params.userName;
        const accountType: string = req.params.accountType;

        // getting all repositories by userName
        const allRepos: AxiosResponse = await gitHubService.getGitHubReposByName(userName, headers, accountType );
        // filtering all repositories and add branches to it
        let result: object[] = await reposService.makeReposToOutputFormat(allRepos, userName, headers );

        logger.info('End getRepos in repositories controller');
        return res.status(200).json(result);

    } catch (error) {
        next(error)
    }
};

export default {getRepos};