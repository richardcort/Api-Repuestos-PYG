import { DataTypes } from "sequelize"

const ClientModel = {
    cedula: {
        type: DataTypes.STRING(8),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE
    },
}

export {
    ClientModel
}