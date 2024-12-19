import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { brandServices } from "../services"

class BrandValidator {
    public validateBrand = [
        body("brandCode").notEmpty().withMessage("Brand Code is required"),
        body("brandCode").isString().withMessage("Brand Code must be string"),
        body("brandCode").isLength({ min: 3, max: 10 }).withMessage("Brand Code must be between 3 and 10 characters"),
        body("name").notEmpty().withMessage("Name is required"),
        body("name").isString().withMessage("Name must be string"),
        body("name").isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),
    ]

    public async checkBrandCode(req: Request, res: Response, next: NextFunction) {
        const { brandCode } = req.body
        const { status, message } = await brandServices.getOne(brandCode as string)
        if (status === 500) {
            return res.status(status).json({
                message
            })
        } else if (status === 200) {
            return res.status(409).json({
                errors: [
                    {
                        type: "field",
                        msg: `Brand Code is already in use`,
                        location: "body"
                    }
                ]
            })
        } 
        next()
    }

    public async checkBrandName(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body
        const { status, message } = await brandServices.getOneByName(name as string)
        if (status === 500) {
            return res.status(status).json({
                message
            })
        } else if (status === 200) {
            return res.status(409).json({
                errors: [
                    {
                        type: "field",
                        msg: `Name is already in use`,
                        location: "body"
                    }
                ]
            })
        } 
        next()
    }
}

export {
    BrandValidator
}