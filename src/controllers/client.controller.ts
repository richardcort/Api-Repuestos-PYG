import { Request, Response } from "express"
import { clientServices } from "../services"

export class ClientController {
    constructor() {
    }

    public all = async (req: Request, res: Response) => {
        const { message, status, data } = await clientServices.getAll()
        return res.status(status).json({
            message,
            data
        })
    }

    public one = async (req: Request, res: Response) => {
        const { cedula } = req.params
        const { message, status, data } = await clientServices.getOne(cedula as string)
        return res.status(status).json({
            message,
            data
        })
    }

    public create = async (req: Request, res: Response) => {
        const { message, status, data } = await clientServices.create(req.body)
        return res.status(status).json({
            message,
            data
        })
    }

    public update = async (req: Request, res: Response) => {
        const { cedula } = req.params
        const { message, status, data } = await clientServices.update(req.body, cedula as string)
        return res.status(status).json({
            message,
            data
        })
    }

    public delete = async (req: Request, res: Response) => {
        const { cedula } = req.params
        const { message, status } = await clientServices.delete(cedula as string)
        return res.status(status).json({
            message
        })
    }
}