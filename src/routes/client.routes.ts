import { Router, Request, Response, NextFunction } from "express"
import { validateFields } from "../middlewares"
import { ClientController } from "../controllers"
import { ClientValidator } from "../validators"

const router = Router()
const clientController = new ClientController()
const clientValidator = new ClientValidator()

//localhost:4000/api/clients
router.get("/",
    (req: Request, res: Response) => {
        clientController.all(req, res)
    }
)

//localhost:4000/api/clients/:cedula
router.get("/:cedula",
    (req: Request, res: Response) => {
        clientController.one(req, res)
    }
)

//localhost:4000/api/clients
router.post("/",
    clientValidator.validateClient,
    (req: Request, res: Response, next: NextFunction) => {
        clientValidator.checkClientCedula(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        clientController.create(req, res)
    }
)

//localhost:4000/api/clients/:cedula
router.put("/:cedula",
    clientValidator.validateClient,
    (req: Request, res: Response, next: NextFunction) => {
        clientValidator.checkClientCedula(req, res, next)
    },
    (req: Request, res: Response, next: NextFunction) => {
        validateFields(req, res, next)
    },
    (req: Request, res: Response) => {
        clientController.update(req, res)
    }
)

//localhost:4000/api/clients/:cedula
router.delete("/:cedula",
    (req: Request, res: Response) => {
        clientController.delete(req, res)
    }
)

export default router