import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import SuccessResponse from "../utils/common/success-response";
const info = (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json(new SuccessResponse({}, 'Server is live'));
}

export default info