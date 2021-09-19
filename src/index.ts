import express from 'express';
import routes from './routes/repositories';
import log4js from 'log4js';
import bodyParser from 'body-parser';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
const swaggerDocument = YAML.load(path.join(__dirname,'../../src/swagger/apiDoc.yaml'));


const app = express();
const port = 5000;

/** Logging */
const logger = log4js.getLogger();
logger.level = 'info';
//const logger = log4js.getLogger();
//app.use(log4js.connectLogger(logger, { level: 'info' } ))

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

/*app.get('/', (req, res) => {
    logger.info('log4js log info');
    logger.error('log4js log error');
    res.send('Hello world!');
});*/

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        status: 404,
        message: error.message
    });
});

app.listen(port, () => console.log(`Running on port ${port}`));