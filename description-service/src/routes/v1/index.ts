import express from 'express'
import { InfoController } from '../../controllers';
import captionRoutes from './caption-routes';
import descriptionRoutes from './description-routes';
const router = express.Router();
router.get('/info', InfoController)
router.use('/caption', captionRoutes)
router.use('/descriptions', descriptionRoutes)
export default router