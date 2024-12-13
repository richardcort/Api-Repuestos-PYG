import { Router, Request, Response, NextFunction } from "express"

import { validateFields } from "../middlewares"
import { CompanyController } from "../controllers"
import { CompanyValidator } from "../validators"

const router = Router()
const companyController = new CompanyController()
const companyValidator = new CompanyValidator()

//localhost:4000/api/company
router.get("/",
    (req: Request, res: Response) => {
        companyController.getCompany(req, res)
    }
)

//localhost:4000/api/company
router.post("/",
    companyValidator.validateCompany,
    (req: Request, res: Response, next: NextFunction) => {
        companyValidator.companyAlreadyExists(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        companyController.create(req, res)
    }
)

//localhost:4000/api/company/:rif
router.put("/:rif",
    companyValidator.validateCompany,
    (req: Request, res: Response, next: NextFunction) => {
        companyValidator.validateIfRifExist(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        companyController.update(req, res)
    }
)

export default router