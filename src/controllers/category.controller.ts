import { Request, Response } from "express"
import { categoryServices } from "../services"

export class CategoryController {
    constructor() {
    }

    public all = async (req: Request, res: Response) => {
        const { message, status, data } = await categoryServices.getAll()
        return res.status(status).json({
            message,
            data
        })
    }

    public one = async (req: Request, res: Response) => {
        const { code } = req.params
        const { message, status, data } = await categoryServices.getOne(code as string)
        return res.status(status).json({
            message,
            data
        })
    }

    public create = async (req: Request, res: Response) => {
        const { message, status, data } = await categoryServices.create(req.body)
        return res.status(status).json({
            message,
            data
        })
    }

    public update = async (req: Request, res: Response) => {
        const { code } = req.params
        const { message, status, data } = await categoryServices.update(req.body, code as string)
        return res.status(status).json({
            message,
            data
        })
    }

    public delete = async (req: Request, res: Response) => {
        const { code } = req.params
        const { message, status } = await categoryServices.delete(code as string)
        return res.status(status).json({
            message
        })
    }
}