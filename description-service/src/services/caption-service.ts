import FormData from "form-data";
import { createReadStream } from 'fs'
import axios from 'axios'
import CaptionRepository from "../repositories/caption-repository";
import { CreateCaption } from "../models/captions";
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
        console.log(createCaption);
        return response
    }
    async getCaptionById(id: number) {
        try {
            const response = await this.captionRepository.get(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
export default CaptionService