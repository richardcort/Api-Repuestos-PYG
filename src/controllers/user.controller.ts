import { Response, Request } from "express"

import { userServices } from "../services"

export class UserController {
    constructor() {

    }

    all = async (req: Request, res: Response) => {
        const { message, status, data } = await userServices.getAll()
        return res.status(status).json({
            message,
            data
        })
    }

    one = async (req: Request, res: Response) => {
        const { id } = req.params
        const { message, status, data } = await userServices.getOne(Number(id))
        return res.status(status).json({
            message,
            data
        })
    }

    create = async (req: Request, res: Response) => {
        const { message, status, data } = await userServices.create(req.body)
        return res.status(status).json({
            message,
            data
        })
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { message, status, data } = await userServices.update(req.body, Number(id))
        return res.status(status).json({
            message,
            data
        })
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params
        const { message, status, data } = await userServices.delete(Number(id))
        return res.status(status).json({
            message,
            data
        })
    }

    login = async (req: Request, res: Response) => {
        const { email } = req.body
        const { message, status, data } = await userServices.getByEmail(email)
        return res.status(status).json({
            message,
            data
        })
    }
}