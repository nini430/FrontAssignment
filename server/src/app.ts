import express from 'express'
import cors from 'cors'

import apiRoute from './routes/api'

const app=express();

app.use(express.json())
app.use(cors())

app.use('/api/v1',apiRoute);

export default app;