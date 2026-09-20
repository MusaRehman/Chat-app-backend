import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgress-connection";

export const ChatMember = sequelize.define(
  "ChatMember",
  {
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "chat_id",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "user_id",
    },

    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "joined_at",
    },
  },
  {
    tableName: "chat_members",
    timestamps: false,
  }
);