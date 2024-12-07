import { Response, Request } from "express"

import { roleServices } from "../services"

export class RoleController {
    constructor() {

    }

    all = async (req: Request, res: Response) => {
        const { message, status, data } = await roleServices.getAll()
        return res.status(status).json({
            message,
            data
        })
    }

    one = async (req: Request, res: Response) => {
        const { id } = req.params
        const { message, status, data } = await roleServices.getOne(Number(id))
        return res.status(status).json({
            message,
            data
        })
    }

    create = async (req: Request, res: Response) => {
        const { message, status, data } = await roleServices.create(req.body)
        return res.status(status).json({
            message,
            data
        })
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { message, status, data } = await roleServices.update(req.body, Number(id))
        return res.status(status).json({
            message,
            data
        })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        const { message, status, data } = await roleServices.delete(Number(id))
        return res.status(status).json({
            message,
            data
        })
    }
}