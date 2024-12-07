import { Router, Response, Request, NextFunction } from "express"

import { validateFields } from "../middlewares"
import { RoleController } from "../controllers"
import { RoleValidator } from "../validators"

const router = Router()
const roleValidator = new RoleValidator()
const roleController = new RoleController()

//localhost:3000/api/roles
router.get("/", (req: Request, res: Response) => {
    roleController.all(req, res)
})

//localhost:3000/api/roles/1
router.get("/:id", (req: Request, res: Response) => {
    roleController.one(req, res)
})

//localhost:3000/api/roles
router.post("/",
    roleValidator.validateRole,
    (req: Request, res: Response, next: NextFunction) => {
        roleValidator.validateIfNameIsUse(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        roleController.create(req, res)
    }
)

//localhost:3000/api/roles/:id
router.put("/:id",
    roleValidator.validateRole,
    (req: Request, res: Response, next: NextFunction) => {
        roleValidator.validateIfIdExist(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        roleValidator.validateIfNameIsUse(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        roleController.update(req, res)
    }
)

//localhost:3000/api/roles/:id
router.delete("/:id", (req: Request, res: Response) => {
    roleController.delete(req, res)
})

export default router