import express from 'express';
import controller from '../controllers/repositories';

const router = express.Router();

router.get('/repositories/:accountType/:userName', controller.getRepos);

export = router;