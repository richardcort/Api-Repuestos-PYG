import { DataTypes } from "sequelize"

const CompanyModel = {
    rif: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}

export {
    CompanyModel
}