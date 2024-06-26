import FormData from "form-data";
import { createReadStream } from 'fs'
import axios from 'axios'
import CaptionRepository from "../repositories/caption-repository";
import { CreateCaption } from "../models/captions";
import { sendData } from "../config/message-queue-config";
import { Captions } from "@prisma/client";
class CaptionService {
    constructor(private captionRepository: CaptionRepository) {
    }
    async getCaption(data: any) {
        console.log('the data ', data);
        /**1. Call the flask server 
         * 2. use axios 
        */
        const file = new FormData();
        file.append('file', createReadStream(data.path));
        // console.log('created file is ', file)
        const response = await axios({
            method: "post",
            url: "http://127.0.0.1:5000/upload",
            data: file,
        }).then((res) => {
            // console.log(res);
            return res.data;
        })
        console.log('response is ', response)
        const createCaption: CreateCaption = {
            imageName: data.filename,
            caption: response.message
        }
        const createdCaption = await this.captionRepository.create(createCaption);
        sendData(createdCaption);
        console.log(createCaption);
        return createdCaption;
    }

    async getCaptionById(id: number): Promise<Captions> {
        try {
            const response = await this.captionRepository.get(id);
            if (!response)
                throw new Error('Caption with given id not found');
            return response;
        } catch (error) {
            throw error;
        }
    }
}
export default CaptionService