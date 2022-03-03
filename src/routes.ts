import { Express, Request, Response } from "express";
import {
  createProjectHandler,
  deleteProjectHandler,
  getAllProjectHandler,
  getProjectHandler,
  updateProjectHandler,
} from "./controller/project.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
  isUserSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requiredUser";
import validateResource from "./middleware/validateResource";
import {
  createProjectSchema,
  getProjectSchema,
  updateProjectSchema,
} from "./schema/project.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send();
  });
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions/isUser", requireUser, isUserSessionHandler);
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/projects",
    [requireUser, validateResource(createProjectSchema)],
    createProjectHandler
  );
  app.get("/api/projects/:projectId", getProjectHandler);
  app.get("/api/projects", getAllProjectHandler);

  app.put(
    "/api/projects/:projectId",
    validateResource(updateProjectSchema),
    updateProjectHandler
  );

  app.delete(
    "/api/projects/:projectId",
    [requireUser, validateResource(getProjectSchema)],
    deleteProjectHandler
  );
};

export default routes;
