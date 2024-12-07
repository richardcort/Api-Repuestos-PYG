import { Request, Response, NextFunction, Router } from "express"

import { validateFields } from "../middlewares"
import { UserController } from "../controllers"
import { UserValidator } from "../validators"

const router = Router()
const userController = new UserController()
const userValidator = new UserValidator()

//localhost:3000/api/users
router.get("/", (req: Request, res: Response) => {
    userController.all(req, res)
})

//localhost:3000/api/users/:id
router.get("/:id", (req: Request, res: Response) => {
    userController.one(req, res)
})

//localhost:3000/api/users
router.post("/",
    userValidator.validateUSer,
    (req: Request, res: Response, next: NextFunction) => {
        userValidator.validateRolId(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        userController.create(req, res)
    }
)

//localhost:3000/api/users/:id
router.put("/:id",
    userValidator.validateUSer,
    (req: Request, res: Response, next: NextFunction) => {
        userValidator.validateRolId(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        userController.update(req, res)
    }
)

//localhost:3000/api/users
router.delete("/:id", (req: Request, res: Response) => {
    userController.delete(req, res)
})

//localhost:3000/api/users/login
router.post("/login",
    userValidator.validateLogin,
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        userController.login(req, res)
    }
)

export default router