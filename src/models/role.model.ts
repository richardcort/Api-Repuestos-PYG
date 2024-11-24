import { DataTypes } from "sequelize"

const RoleModel = {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    deleteAt: {
        type: DataTypes.DATE
    }
}

export {
    RoleModel
}