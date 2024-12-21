import { Router, Request, Response, NextFunction } from "express"
import { validateFields } from "../middlewares"
import { CategoryController } from "../controllers"
import { CategoryValidator } from "../validators"

const router = Router()
const categoryController = new CategoryController()
const categoryValidator = new CategoryValidator()

//localhost:4000/api/categories
router.get("/",
    (req: Request, res: Response) => {
        categoryController.all(req, res)
    }
)

//localhost:4000/api/categories/:code
router.get("/:code",
    (req: Request, res: Response) => {
        categoryController.one(req, res)
    }
)

//localhost:4000/api/categories
router.post("/",
    categoryValidator.validateCategory,
    (req: Request, res: Response, next: NextFunction) => {
        categoryValidator.checkCategoryCode(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        categoryValidator.checkCategoryName(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        categoryController.create(req, res)
    }
)

//localhost:4000/api/categories/:code
router.put("/:code",
    categoryValidator.validateCategory,
    (req: Request, res: Response, next: NextFunction) => {
        categoryValidator.checkCategoryCode(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        categoryValidator.checkCategoryName(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        categoryController.update(req, res)
    }
)

//localhost:4000/api/categories/:code
router.delete("/:code",
    (req: Request, res: Response) => {
        categoryController.delete(req, res)
    }
)

export default router