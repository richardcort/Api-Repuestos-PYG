import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { companyServices } from "../services"

class CompanyValidator {
    public validateCompany = [
        body("rif").notEmpty().withMessage("Rif is required"),
        body("rif").isString().withMessage("Rif must be string"),
        body("rif").isLength({ min: 10 }).withMessage("Rif must be 10 characters"),
        body("rif").matches(/^[VJEGP][0-9]{8}[0-9]$/).withMessage("Rif format is invalid. It must start with an uppercase letter followed by 8 digits and a check digit."),
        body("name").notEmpty().withMessage("Name is required"),
        body("name").isString().withMessage("Name must be string"),
        body("name").isLength({ min: 5, max: 60 }).withMessage("Name must be between 5 and 60 characters"),
        body("address").notEmpty().withMessage("Address is required"),
        body("address").isString().withMessage("Address must be string")
    ]

    public async checkCompanyRegistered (req: Request, res: Response, next: NextFunction) {
        const { status, message } = await companyServices.getRecord()
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
                        msg: `The company is already registered`,
                        path: "",
                        location: "body"
                    }
                ]
            })
        }
        next()
    }

    public async checkRifExists (req: Request, res: Response, next: NextFunction) {
        const { rif } = req.params
        const { status, message } = await companyServices.getRecord(rif as string)
        if (status === 500) {
            return res.status(status).json({
                message
            })
        } else if (status === 404) {
            return res.status(status).json({
                errors: [
                    {
                        type: "field",
                        value: "",
                        msg: `Rif not found`,
                        path: "rif",
                        location: "params"
                    }
                ]
            })
        }
        next()
    }
}

export {
    CompanyValidator
}