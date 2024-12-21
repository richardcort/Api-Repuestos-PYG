import { Request, Response, NextFunction } from "express"
import { body } from "express-validator"
import { categoryServices } from "../services"

class CategoryValidator {
    public validateCategory = [
        body("category_code").notEmpty().withMessage("Category Code is required"),
        body("category_code").isString().withMessage("Category Code must be string"),
        body("category_code").isLength({ min: 3, max: 10 }).withMessage("Category Code must be between 3 and 10 characters"),
        body("name").notEmpty().withMessage("Name is required"),
        body("name").isString().withMessage("Name must be string"),
        body("name").isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),
        body("description").notEmpty().withMessage("The description is required"),
        body("description").isString().withMessage("the description must be string"),
    ]

    public async checkCategoryCode(req: Request, res: Response, next: NextFunction) {
        const { code } = req.params
        const { category_code } = req.body
        if (code) {
            const { status, message } = await categoryServices.getOne(code)
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
                            msg: `Category Code not found`,
                            path: "code",
                            location: "params"
                        }
                    ]
                })
            }
        } else {
            const { status, message } = await categoryServices.getOne(category_code as string)
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
                            msg: `Category Code is already in use`,
                            path: "category_code",
                            location: "body"
                        }
                    ]
                })
            }
        }
        next()
    }

    public async checkCategoryName(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body
        const { status, message } = await categoryServices.getOneByName(name as string)
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
    CategoryValidator
}