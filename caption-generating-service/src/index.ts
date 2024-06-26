import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { serverConfig } from './config';
import apiRoutes from './routes'
import { connectQueue } from './config/message-queue-config';
import cors from 'cors'
const app: Express = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(multer.array())
app.use('/api', apiRoutes)
app.listen(serverConfig.PORT, async () => {
    console.log(`Server is up and running on port ${serverConfig.PORT}`);
    await connectQueue();
})
app.listen()