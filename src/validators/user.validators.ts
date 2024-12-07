import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"

import { roleServices } from "../services"

class UserValidator {
    public validateUSer = [
        body("name").notEmpty().withMessage("Name is required"),
        body("name").isString().withMessage("Name must be string"),
        body("email").notEmpty().withMessage("Email is required"),
        body("email").isEmail().withMessage("Email must be email"),
        body("password").notEmpty().withMessage("Password is required"),
        body("password").isString().withMessage("Password must be string"),
        body("role_id").notEmpty().withMessage("Role id is required"),
        body("role_id").isNumeric().withMessage("Role id must be numeric"),
    ]

    public validateLogin = [
        body("email").notEmpty().withMessage("Email is required"),
        body("email").isEmail().withMessage("Email must be email"),
        body("password").notEmpty().withMessage("Password is required"),
        body("password").isString().withMessage("Password must be string"),
    ]

    public validateRolId = async (req: Request, res: Response, next: NextFunction) => {
        const { role_id } = req.body
        const { message, status, data } = await roleServices.getOne(Number(role_id))

        if (status == 500) {
            return res.status(status).json({
                message
            })
        } else if (status == 404) {
            return res.status(400).json({
                errors: [
                    {
                        type: "field",
                        msg: `Role id : ${role_id}, does not exist`,
                        path: "role_id",
                        location: "body",
                    },
                ],
            })
        }
        next()
    }
}

export {
    UserValidator
}