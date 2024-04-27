import express, { Router } from 'express'
import { CaptionController } from '../../controllers';
import uploadImage from '../../middlewares/upload-image';
const captionRoutes: Router = express.Router();

captionRoutes.post('/', uploadImage.upload.single("image"), CaptionController.getCaption);

export default captionRoutes
