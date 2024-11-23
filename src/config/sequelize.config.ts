import { Sequelize } from "sequelize"

const dbName: string | undefined = process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'repuestos_p&g'
const dbUser: string | undefined = process.env.DATABASE_USER ? process.env.DATABASE_USER : 'root'
const dbPassword: string | undefined = process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : ''

// instantiate the object sequelize
const db = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "postgres",
    host: "localhost",
    logging: false,
})

// create tables in alphabetical order

// sync models with the database
const syncModels = async () => {
    await db.sync({ alter: true })
    try {

    } catch (error) {
        console.error(error)
    }
}

syncModels()

export {
    db
}
