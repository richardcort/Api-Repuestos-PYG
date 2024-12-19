import { Router, Request, Response, NextFunction } from "express"
import { validateFields } from "../middlewares"
import { BrandController } from "../controllers"
import { BrandValidator } from "../validators"

const router = Router()
const brandController = new BrandController()
const brandValidator = new BrandValidator()

//localhost:4000/api/brands
router.get("/",
    (req: Request, res: Response) => {
        brandController.all(req, res)
    }
)

//localhost:4000/api/brands/:code
router.get("/:code",
    (req: Request, res: Response) => {
        brandController.one(req, res)
    }
)

//localhost:4000/api/brands
router.post("/",
    brandValidator.validateBrand,
    (req: Request, res: Response, next: NextFunction) => {
        brandValidator.checkBrandCode(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        brandValidator.checkBrandName(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        brandController.create(req, res)
    }
)

//localhost:4000/api/brands/:code
router.put("/:code",
    brandValidator.validateBrand,
    (req: Request, res: Response, next: NextFunction) => {
        brandValidator.checkBrandCode(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        brandValidator.checkBrandName(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        brandController.update(req, res)
    }
)

//localhost:4000/api/brands/:code
router.delete("/:code",
    (req: Request, res: Response) => {
        brandController.delete(req, res)
    }
)

export default router