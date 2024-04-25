import express from 'express'
import { InfoController } from '../../controllers';
import captionRoutes from './caption-routes';
const router = express.Router();
router.get('/info', InfoController)
router.use('/caption', captionRoutes)
export default router