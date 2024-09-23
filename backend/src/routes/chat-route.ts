import { Router } from "express";
import { verifyToken } from  "../utils/token_manager"
import  { chatCompletionValidator,validate}  from  "../utils/validator.js"
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from  "../controllers/chat-controller"

//Protected API
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;