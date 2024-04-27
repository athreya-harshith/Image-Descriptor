import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { serverConfig } from './config';
import apiRoutes from './routes'
import { DescriptionService } from './services/description-service';
import cors from 'cors'
const descriptionService = new DescriptionService();
const app: Express = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(multer.array())
app.use('/api', apiRoutes)
app.listen(serverConfig.PORT, () => {
    console.log(`Server is up and running on port ${serverConfig.PORT}`)
    descriptionService.connectQueue();
})
app.listen()