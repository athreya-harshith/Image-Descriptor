import { Request, Response } from "express";
import { DescriptionService } from "../services/description-service";
import { StatusCodes } from "http-status-codes";
import { Captions } from "@prisma/client";
import SuccessResponse from "../utils/common/success-response";
import ErrorResponse from "../utils/error-response";
const descriptionService = new DescriptionService();

const getDescription = async (req: Request, res: Response) => {
    try {
        const response: Captions = await descriptionService.getThePropmtFromRequest(req.body.id, req.body.prompt);
        return res.status(StatusCodes.OK).json(new SuccessResponse(response, 'Generated the Description according to prompt'));
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse('Some thing went wrong', StatusCodes.INTERNAL_SERVER_ERROR, error as Error));
    }
}
export default {
    getDescription
}