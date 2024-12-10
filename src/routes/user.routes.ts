import { Request, Response, NextFunction, Router } from "express"

import { validateFields } from "../middlewares"
import { UserController } from "../controllers"
import { UserValidator } from "../validators"

const router = Router()
const userController = new UserController()
const userValidator = new UserValidator()

//localhost:4000/api/users
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags: 
 *       - Users
 *     responses: 
 *       200:
 *         description: Users found successfully
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example : "Records found"
 *                 data: 
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user_id: 
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: richard
 *                           email: 
 *                             type: string 
 *                             example: richardcortez@gmail.com
 *                           password: 
 *                             type: string 
 *                             example: 123456
 *                           status: 
 *                             type: boolean
 *                             example: true
 *                           role_id: 
 *                             type: integer
 *                             example: 1
 *                           deleteAt: 
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
 *                             example: "2024-09-08T19:10:01.000Z" 
 *       404:
 *         description: No users found 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example : "No records found"
 *                 data: 
 *                   type: object
 *                   properties:
 *                     users:  
 *                       type: array 
 *                       example: []                 
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
    userController.all(req, res)
})

//localhost:4000/api/users/:id
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: 
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the user
 *     responses: 
 *       200:
 *         description: User found successfully
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example : "Record found"
 *                 data: 
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         user_id: 
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: richard
 *                         email: 
 *                           type: string 
 *                           example: richardcortez@gmail.com
 *                         password: 
 *                           type: string 
 *                           example: 123456
 *                         status: 
 *                           type: boolean
 *                           example: true
 *                         role_id: 
 *                           type: integer
 *                           example: 1
 *                         deleteAt: 
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
 *         description: User not found 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example : "No record found"
 *                 data: 
 *                   type: object
 *                   properties:
 *                     user:  
 *                       type: object 
 *                       example: null                 
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
    userController.one(req, res)
})

//localhost:4000/api/users
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "richard"
 *               email: 
 *                 type: string
 *                 example: richardcortez@gmail.com
 *               password: 
 *                 type: string
 *                 example: 123456
 *               role_id: 
 *                 type: integer 
 *                 example: 1
 *     responses:
 *       201:
 *         description: User created successfully
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         user_id: 
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: richard
 *                         email: 
 *                           type: string 
 *                           example: richardcortez@gmail.com
 *                         password: 
 *                           type: string 
 *                           example: 123456
 *                         status: 
 *                           type: boolean
 *                           example: true
 *                         role_id: 
 *                           type: integer
 *                           example: 1
 *                         deleteAt: 
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

//localhost:4000/api/users/:id
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "richard-updated"
 *               email: 
 *                 type: string
 *                 example: richardcortez-updated@gmail.com
 *               password: 
 *                 type: string
 *                 example: 123456-updated
 *               role_id: 
 *                 type: integer 
 *                 example: 2
 *     responses:
 *       201:
 *         description: User updated successfully
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         user_id: 
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: richard-updated
 *                         email: 
 *                           type: string 
 *                           example: richardcortez-updated@gmail.com
 *                         password: 
 *                           type: string 
 *                           example: 123456-updated
 *                         status: 
 *                           type: boolean
 *                           example: true
 *                         role_id: 
 *                           type: integer
 *                           example: 2
 *                         deleteAt: 
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

//localhost:4000/api/users/:id
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       204:
 *         description: User deleted successfully
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
    userController.delete(req, res)
})

//localhost:4000/api/users/login
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