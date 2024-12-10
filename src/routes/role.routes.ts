import { Router, Response, Request, NextFunction } from "express"

import { validateFields } from "../middlewares"
import { RoleController } from "../controllers"
import { RoleValidator } from "../validators"

const router = Router()
const roleValidator = new RoleValidator()
const roleController = new RoleController()

//localhost:4000/api/roles
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: List all roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Roles found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Records found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           role_id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "manager"
 *                           status:
 *                             type: boolean
 *                             example: true
 *                           deletedAt: 
 *                             type: string
 *                             format: date-time
 *                             example: null
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-08T19:10:01.000Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-09T04:33:16.000Z"
 *       404:
 *         description: No roles found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No records found"
 *                 data:
 *                   type: object
 *                   properties:
 *                      roles:
 *                          type: array
 *                          example: []
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:    
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact the administrator: error"
 */ 
router.get("/", (req: Request, res: Response) => {
    roleController.all(req, res)
})

//localhost:4000/api/roles/1
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the role
 *     responses:
 *       200:
 *         description: Role found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Record found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: object
 *                       properties:
 *                         role_id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "manager"
 *                         status:
 *                           type: boolean
 *                           example: true
 *                         deletedAt:
 *                           type: string
 *                           format: date-time
 *                           example: null
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No record found"
 *                 data: 
 *                   type: object
 *                   properties:
 *                      role:
 *                        type: object
 *                        example: null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:    
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact the administrator: error"                                           
 */
router.get("/:id", (req: Request, res: Response) => {
    roleController.one(req, res)
})

//localhost:4000/api/roles
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "manager"
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful creation"
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: object
 *                       properties:
 *                         role_id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "manager"  
 *                         status:
 *                           type: boolean
 *                           example: true
 *                         deletedAt:
 *                           type: string
 *                           format: date-time
 *                           example: null
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact the administrator: error"
 */
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

//localhost:4000/api/roles/:id
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "manager"
 *     responses:
 *       201:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful upgrade"
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: object
 *                       properties:
 *                         role_id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "manager-updated"  
 *                         status:
 *                           type: boolean
 *                           example: true
 *                         deletedAt:
 *                           type: string
 *                           format: date-time
 *                           example: null
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-08T19:10:01.000Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-12-08T22:43:27.321Z"
 *                         
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact the administrator: error"
 */
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

//localhost:4000/api/roles/:id
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role
 *     responses:
 *       204:
 *         description: Role deleted successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact the administrator: error"
 */
router.delete("/:id", (req: Request, res: Response) => {
    roleController.delete(req, res)
})

export default router