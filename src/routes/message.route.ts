import { Express } from "express";
import {
  createMessageHandler,
  deleteMessageHandler,
  getAllMessageHandler,
  updateMessageHandler,
} from "../controller/message.controller";
import { requireUser, validate } from "../middleware";
import {
  createMessageSchema,
  getMessageSchema,
  updateMessageSchema,
} from "../schema/message.schema";

function MessageRoutes(app: Express) {
  app.post(
    "/api/messages",
    validate(createMessageSchema),
    createMessageHandler
  );
  app.get("/api/messages", requireUser, getAllMessageHandler);
  app.put(
    "/api/message/:messageId",
    [requireUser, validate(updateMessageSchema)],
    updateMessageHandler
  );

  app.delete(
    "/api/message/:message",
    [requireUser, validate(getMessageSchema)],
    deleteMessageHandler
  );
}

export default MessageRoutes;
