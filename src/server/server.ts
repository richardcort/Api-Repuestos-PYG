import cors from "cors"
import express from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import { db, swaggerOptions } from "../config"

export class Server {
    private app: any
    private port: number | string
    private pre: string
    private path: any

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.pre = "/api"
        this.path = {

        }
        this.connectDataBase()
        this.middlewares()
        this.routes()
        this.swaggerSetup()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static("src/public"))
    }

    routes() {

    }

    async connectDataBase() {
        await db
            .authenticate()
            .then(() => {
                console.log("Successful database connection")
            })
            .catch((error: any) => {
                console.log("Unable to connect to the database")
            })
    }

    swaggerSetup() {
        const swaggerDoc = swaggerJSDoc(swaggerOptions)
        this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in localhost:${this.port}`)
        })
    }
}