import { Request, Response } from "express"
import { brandServices } from "../services"

export class BrandController {
    constructor() {
    }
    all = async (req: Request, res: Response) => {
        const { message, status, data } = await brandServices.getAll()
        return res.status(status).json({
            message,
            data
        })
    }
    one = async (req: Request, res: Response) => {
        const { code } = req.params
        const { message, status, data } = await brandServices.getOne(code as string)
        return res.status(status).json({
            message,
            data
        })
    }
    create = async (req: Request, res: Response) => {
        const { message, status, data } = await brandServices.create(req.body)
        return res.status(status).json({
            message,
            data
        })
    }
    update = async (req: Request, res: Response) => {
        const { code } = req.params
        const { message, status, data } = await brandServices.update(req.body, code as string)
        return res.status(status).json({
            message,
            data
        })
    }
    delete = async (req: Request, res: Response) => {
        const { code } = req.params
        const { message, status } = await brandServices.delete(code as string)
        return res.status(status).json({
            message
        })
    }
}