import express from 'express';
import routes from './routes/repositories';
import log4js from 'log4js';
import bodyParser from 'body-parser';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
const swaggerDocument = YAML.load(path.join(__dirname,'../../src/swagger/apiDoc.yaml'));
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

/** Logging */
const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

app.use(bodyParser.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
app.get('/', (req, res) => {
    res.send('Healthy!');
});
app.get('/health', (req, res) => {
    res.send('Healthy!');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);


/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    logger.error(JSON.stringify(error.message));
    return res.status(404).json({
        status: 404,
        message: error.message
    });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));