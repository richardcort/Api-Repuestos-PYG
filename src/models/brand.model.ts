import { DataTypes } from "sequelize"

const BrandModel = {
    brand_code: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    deletedAt: {
        type: DataTypes.DATE
    }
}

export {
    BrandModel
}