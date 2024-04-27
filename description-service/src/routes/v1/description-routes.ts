import express, { Router } from 'express'
import { DescriptionController } from '../../controllers';
const descriptionRoutes: Router = express.Router();

descriptionRoutes.patch('/', DescriptionController.getDescription);

export default descriptionRoutes
