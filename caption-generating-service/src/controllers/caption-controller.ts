import { Request, Response } from 'express'

import { CaptionService } from '../services'
import { StatusCodes } from 'http-status-codes';
import SuccessResponse from '../utils/common/success-response';
import CaptionRepository from '../repositories/caption-repository';
const captionService: CaptionService = new CaptionService(new CaptionRepository());

const getCaption = async (req: Request, res: Response) => {
    try {
        const response = await captionService.getCaption(req.file);
        return res.status(StatusCodes.OK).json(new SuccessResponse({ res: response }, 'Obtained the caption', StatusCodes.OK));
    } catch (error) {

    }
}

export default {
    getCaption
}