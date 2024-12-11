import { DataTypes } from "sequelize"

const CompanyModel = {
    rif: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}

export {
    CompanyModel
}