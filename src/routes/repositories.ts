import express from 'express';
import controller from '../controllers/repositories';

const router = express.Router();

router.get('/repositories/:username', controller.getRepos);

export = router;