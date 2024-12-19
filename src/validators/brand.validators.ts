import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { brandServices } from "../services"

class BrandValidator {
    public validateBrand = [
        body("brand_code").notEmpty().withMessage("Brand Code is required"),
        body("brand_code").isString().withMessage("Brand Code must be string"),
        body("brand_code").isLength({ min: 3, max: 10 }).withMessage("Brand Code must be between 3 and 10 characters"),
        body("name").notEmpty().withMessage("Name is required"),
        body("name").isString().withMessage("Name must be string"),
        body("name").isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),
    ]

    public async checkBrandCode(req: Request, res: Response, next: NextFunction) {
        const { code } = req.params
        const { brand_code } = req.body
        if (code) {
            const { status, message } = await brandServices.getOne(code)
            if (status === 500) {
                return res.status(status).json({
                    message
                })
            } else if (status === 404) {
                return res.status(status).json({
                    errors: [
                        {
                            type: "field",
                            value: code,
                            msg: `Brand Code not found`,
                            path: "code",
                            location: "params"
                        }
                    ]
                })
            }
        } else {
            const { status, message } = await brandServices.getOne(brand_code as string)
            if (status === 500) {
                return res.status(status).json({
                    message
                })
            } else if (status === 200) {
                return res.status(409).json({
                    errors: [
                        {
                            type: "field",
                            value: "",
                            msg: `Brand Code is already in use`,
                            path: "brand_code",
                            location: "body"
                        }
                    ]
                })
            }
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
                        value: "",
                        msg: `Name is already in use`,
                        path: "name",
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