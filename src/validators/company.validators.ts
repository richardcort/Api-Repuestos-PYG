import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"
import { companyServices } from "../services"

class CompanyValidator {
    public validateCompany = [
        body("rif").notEmpty().withMessage("Rif is required"),
        body("rif").isString().withMessage("Rif must be string"),
        body("name").notEmpty().withMessage("Name is required"),
        body("name").isString().withMessage("Name must be string"),
        body("address").notEmpty().withMessage("Address is required"),
        body("address").isString().withMessage("Address must be string")
    ]

    public companyAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
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
                        msg: `Company already exists`,
                        location: "database"
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