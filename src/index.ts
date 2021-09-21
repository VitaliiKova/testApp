import express from 'express';
import routes from './routes/repositories';
import log4js from 'log4js';
import bodyParser from 'body-parser';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
const swaggerDocument = YAML.load(path.join(__dirname,'../../src/swagger/api-doc.yaml'));
import dotenv from 'dotenv';
import {errorHandler} from './middleware/error';


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
    res.send('Hello World!');
});
app.get('/health', (req, res) => {
    res.send('Healthy!');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

/** Error handling */
app.use(errorHandler);



app.listen(PORT, () => console.log(`Running on port ${PORT}`));