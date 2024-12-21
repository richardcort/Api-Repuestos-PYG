import { Request, Response, NextFunction } from "express"
import { body } from "express-validator"
import { clientServices } from "../services"

class ClientValidator {
    public validateClient = [
        body("cedula").notEmpty().withMessage("Cedula is required"),
        body("cedula").isString().withMessage("Cedula must be a string"),
        body("cedula").isLength({ min: 7, max: 8 }).withMessage("Cedula must be between 7 and 8 characters long"),
        body("cedula").matches(/^[0-9]{7,8}$/).withMessage("Cedula format is invalid"),
        body("name").notEmpty().withMessage("Name is required"),
        body("name").isString().withMessage("Name must be a string"),
        body("last_name").notEmpty().withMessage("Last name is required"),
        body("last_name").isString().withMessage("Last name must be a string"),
        body("phone_number").notEmpty().withMessage("Phone number is required"),
        body("phone_number").isString().withMessage("Phone number must be a string"),
        body("phone_number").isLength({ min: 11, max: 11 }).withMessage("Phone number must be exactly 11 characters long"),
        body("phone_number").matches(/^[0-9]{11}$/).withMessage("Phone number format is invalid"),
    ]

    public async checkClientCedula(req: Request, res: Response, next: NextFunction) {
        const { cedula } = req.params
        if (cedula) {
            const { status, message } = await clientServices.getOne(cedula)
            if (status === 500) {
                return res.status(status).json({
                    message
                })
            } else if (status === 404) {
                return res.status(status).json({
                    errors: [
                        {
                            type: "field",
                            value: cedula,
                            msg: `Cedula not found`,
                            path: "cedula",
                            location: "params"
                        }
                    ]
                })
            }
        } else {
            const { cedula } = req.body
            const { status, message } = await clientServices.getOne(cedula as string)
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
                            msg: `The Cedula is already in use`,
                            path: "cedula",
                            location: "body"
                        }
                    ]
                })
            }
        }
        next()
    }
}

export {
    ClientValidator
}