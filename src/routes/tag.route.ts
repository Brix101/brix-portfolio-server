import { Express } from "express";
import {
  createTagHandler,
  deleteTagHandler,
  getAllTagHandler,
  updateTagHandler,
} from "../controller/tag.controller";
import { requireUser, validate } from "../middleware";
import {
  createTagSchema,
  deleteTagSchema,
  getTagSchema,
} from "../schema/tag.schema";

function tagRoutes(app: Express) {
  app.post(
    "/api/tags",
    [requireUser, validate(createTagSchema)],
    createTagHandler
  );
  app.get("/api/tags", getAllTagHandler);
  app.put(
    "/api/tags/:tagId",
    [requireUser, validate(getTagSchema)],
    updateTagHandler
  );

  app.delete(
    "/api/tags/:tagId",
    [requireUser, validate(deleteTagSchema)],
    deleteTagHandler
  );
}

export default tagRoutes;
