import { Request, Response } from 'express'

import { CaptionService } from '../services'
import { StatusCodes } from 'http-status-codes';
import SuccessResponse from '../utils/common/success-response';
import CaptionRepository from '../repositories/caption-repository';
import ErrorResponse from '../utils/error-response';
const captionService: CaptionService = new CaptionService(new CaptionRepository());

const getCaption = async (req: Request, res: Response) => {
    try {
        const response = await captionService.getCaption(req.file);
        return res.status(StatusCodes.OK).json(new SuccessResponse({ res: response }, 'Obtained the caption', StatusCodes.OK));
    } catch (error) {

    }
}
const getCaptionById = async (req: Request, res: Response) => {
    try {
        const id: number = Number(req.params.id);
        const response = await captionService.getCaptionById(id);
        return res.status(StatusCodes.OK).json(new SuccessResponse({ res: response }, 'Obtained the caption data', StatusCodes.OK));
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR, error as Error));
    }
}
export default {
    getCaption,
    getCaptionById
}