import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { serverConfig } from './config';
import apiRoutes from './routes'
const app: Express = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', apiRoutes)
app.listen(serverConfig.PORT, () => {
    console.log(`Server is up and running on port ${serverConfig.PORT}`)
})
app.listen()