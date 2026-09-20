import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgress-connection";

export const Chat = sequelize.define(
    "Chat",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName: "chats",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,
    }
);