import { Express } from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
  isUserSessionHandler,
} from "../controller/session.controller";
import { requireUser, validate } from "../middleware";
import { createSessionSchema } from "../schema/session.schema";

function sessionRoutes(app: Express) {
  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions/isUser", requireUser, isUserSessionHandler);
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default sessionRoutes;
