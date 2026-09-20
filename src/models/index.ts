import { User } from "./users";
import { Chat } from "./chat.model";
import { ChatMember } from "./chatMember.model";
import { Message } from "./message.model";

User.belongsToMany(Chat, {
  through: ChatMember,
  foreignKey: "userId",
});

Chat.belongsToMany(User, {
  through: ChatMember,
  foreignKey: "chatId",
});

Chat.hasMany(Message, {
  foreignKey: "chatId",
});

Message.belongsTo(Chat, {
  foreignKey: "chatId",
});

User.hasMany(Message, {
  foreignKey: "senderId",
});

Message.belongsTo(User, {
  foreignKey: "senderId",
});

export {
  User,
  Chat,
  ChatMember,
  Message,
};