import express from 'express';
import cors from 'cors';

import apiRoute from './routes/api';
import errorHandler from './middleware/error';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', apiRoute);

app.use(errorHandler);

export default app;
