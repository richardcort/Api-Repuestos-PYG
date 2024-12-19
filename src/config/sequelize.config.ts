import { Sequelize } from "sequelize"

import {
    BrandModel,
    CompanyModel,
    RoleModel,
    UserModel
} from "../models"

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
const BrandDB = db.define("brands", BrandModel)
const CompanyDB = db.define("companies", CompanyModel)
const RoleDB = db.define("roles", RoleModel)
const UserBD = db.define("users", UserModel)

// create relations between tables
RoleDB.hasMany(UserBD, { foreignKey: "role_id" })
UserBD.belongsTo(RoleDB, { foreignKey: "role_id" })

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
    BrandDB,
    CompanyDB,
    db,
    RoleDB,
    UserBD,
}
