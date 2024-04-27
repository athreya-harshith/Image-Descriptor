import { PrismaClient, Captions, Prisma } from "@prisma/client";
import { CreateCaption } from "../models/captions";
const prisma = new PrismaClient();
class CaptionRepository {
    async create(captionDetails: CreateCaption): Promise<Captions> {
        const captionData = await prisma.captions.create({
            data: {
                imageName: captionDetails.imageName,
                caption: captionDetails.caption
            }
        });
        return captionData;
    }
    async get(id: number): Promise<Captions | null> {
        const captionData = await prisma.captions.findUnique({
            where: {
                id: id
            }
        });
        return captionData;
    }

    async getAll(): Promise<Captions[]> {
        const captionData = await prisma.captions.findMany();
        return captionData;
    }

    async update(id: number, updateDetails: Partial<Prisma.CaptionsUpdateInput>): Promise<Captions> {
        const updatedCaptionData = await prisma.captions.update({
            where: {
                id: id,
            },
            data: updateDetails
        });
        return updatedCaptionData;
    }
}

export default CaptionRepository