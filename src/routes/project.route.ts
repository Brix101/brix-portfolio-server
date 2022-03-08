import { Express } from "express";
import {
  createProjectHandler,
  deleteProjectHandler,
  getAllProjectHandler,
  getAllProjectByTagHandler,
  getProjectHandler,
  updateProjectHandler,
} from "../controller/project.controller";
import { requireUser, validate } from "../middleware";
import {
  createProjectSchema,
  getProjectSchema,
  updateProjectSchema,
} from "../schema/project.schema";
import { getTagSchema } from "../schema/tag.schema";

function projectRoutes(app: Express) {
  app.post(
    "/api/projects",
    [requireUser, validate(createProjectSchema)],
    createProjectHandler
  );
  app.get("/api/projects/:projectId", getProjectHandler);
  app.get(
    "/api/projects-by-tag",
    validate(getTagSchema),
    getAllProjectByTagHandler
  );
  app.get("/api/projects", getAllProjectHandler);

  app.put(
    "/api/projects/:projectId",
    validate(updateProjectSchema),
    updateProjectHandler
  );

  app.delete(
    "/api/projects/:projectId",
    [requireUser, validate(getProjectSchema)],
    deleteProjectHandler
  );
}

export default projectRoutes;
