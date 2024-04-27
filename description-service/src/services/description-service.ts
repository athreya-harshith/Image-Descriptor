import amqplib, { ConsumeMessage } from 'amqplib';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Captions } from '@prisma/client';
import CaptionRepository from '../repositories/caption-repository';
export class DescriptionService {
    private genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
    private model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    private captionRepository = new CaptionRepository();
    async getThePropmt(captionsData: Captions) {

        let getPrompt: string = 'Give narrative Description on ' + captionsData.caption + 'in 50 words';
        const result = await this.model.generateContent(getPrompt);
        const response = await result.response;
        const text = response.text();
        // console.log('the description is ', text)
        try {
            const updatedDescription = await this.storeDescription(captionsData.id, text);
            console.log(updatedDescription)
        } catch (error) {
            throw error;
        }
    }
    async getThePropmtFromRequest(id: number, prompt: string): Promise<Captions> {
        try {
            // console.log('id and prompt is ', id, prompt)
            const captionsData = await this.captionRepository.get(id);
            console.log('retrieved caption data ', captionsData);
            if (!captionsData)
                throw new Error('Caption Details Not Found');
            let getPrompt: string = prompt + captionsData.caption;
            const result = await this.model.generateContent(getPrompt);
            const response = await result.response;
            const text = response.text();
            const updatedDescription = await this.storeDescription(captionsData.id, text);
            // console.log(updatedDescription)
            return updatedDescription;
        } catch (error) {
            console.log('error is ', error)
            throw error;
        }
    }
    async connectQueue() {
        try {
            const connection = await amqplib.connect('amqp://127.0.0.1');
            const channel = await connection.createChannel();
            console.log('Connected to the CaptionReceiverQueue');
            await channel.assertQueue('CaptionReceiverQueue');
            channel.consume('CaptionReceiverQueue', (data) => {
                console.log('inside')
                console.log(`${Buffer.from(data!.content)}`);
                const object: Captions = JSON.parse(`${Buffer.from(data!.content)}`);
                console.log('the object ', object)
                this.getThePropmt(object);
                channel.ack(data!);
            })
        } catch (error) {
            throw error;
        }
    }

    async storeDescription(id: number, description: string): Promise<Captions> {

        try {
            const result: Captions = await this.captionRepository.update(id, { description });
            return result;
        } catch (error) {
            throw error;
        }
    }
}