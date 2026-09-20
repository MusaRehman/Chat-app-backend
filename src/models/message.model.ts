import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgress-connection";

export const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "chat_id",
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "sender_id",
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "messages",
    timestamps: false,

    indexes: [
      {
        fields: ["chat_id", "created_at"],
      },
    ],
  }
);