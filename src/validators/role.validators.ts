import { NextFunction, Request, Response } from "express"
import { body } from "express-validator"

import { roleServices } from "../services"

class RoleValidator {
    public validateRole = [
        body("name").notEmpty().withMessage("Role name is required"),
        body("name").isString().withMessage("Role name must be string")
    ]

    public validateIfIdExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const { message, status, data } = await roleServices.getOne(Number(id))

        if (status == 500) {
            return res.status(status).json({
                message
            })
        } else if (status == 404) {
            return res.status(status).json({
                errors: [
                    {
                        type: "field",
                        msg: `The parameter id : ${id}, does not exist in the database.`,
                        path: id,
                        location: "param"
                    }
                ]
            })
        }
        next()
    }

    public validateIfNameIsUse = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        let { name } = req.body
        const { message, status, data } = await roleServices.getByName(name)

        if (status == 500) {
            return res.status(status).json({
                message
            })
        } else if (status == 200) {
            const role: any = data?.role
            //case if it is to update data
            if (id) {
                if (id != role.id) {
                    return res.status(400).json({
                        errors: [
                            {
                                type: "field",
                                msg: `Name in use : ${name}, for the current record`,
                                path: "name",
                                location: "body",
                            },
                        ]
                    })
                }
            //case if it is to register a new role
            } else {
                return res.status(400).json({
                    errors: [
                        {
                            type: "field",
                            msg: `Name in use : ${name}, for the new role`,
                            path: "name",
                            location: "body",
                        },
                    ]
                })
            }
        }
        next()
    }
}

export {
    RoleValidator
}

