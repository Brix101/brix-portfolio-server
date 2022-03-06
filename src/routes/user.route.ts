import { Express } from "express";
import { createUserHandler } from "../controller/user.controller";
import { validate } from "../middleware";
import { createUserSchema } from "../schema/user.schema";

function userRoutes(app: Express) {
  app.post("/api/users", validate(createUserSchema), createUserHandler);
}

export default userRoutes;
