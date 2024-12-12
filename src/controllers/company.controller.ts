import { Request, Response } from "express"
import { companyServices } from "../services"

export class CompanyController {
    constructor() {
    }
    getCompany = async (req: Request, res: Response) => {
        const { message, status, data } = await companyServices.getRecord()
        return res.status(status).json({
            message,
            data
        })
    }
    create = async (req: Request, res: Response) => {
        const { message, status, data } = await companyServices.create(req.body)
        return res.status(status).json({
            message,
            data
        })
    }
    update = async (req: Request, res: Response) => {
        const { rif } = req.params
        const { message, status, data } = await companyServices.update(req.body, rif as string)
        return res.status(status).json({
            message,
            data
        })
    }
}