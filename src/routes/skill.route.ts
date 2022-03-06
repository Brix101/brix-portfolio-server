import { Express } from "express";
import {
  createSkillHandler,
  deleteSkillHandler,
  getAllSkillHandler,
  updateSkillHandler,
} from "../controller/skill.controller";
import { requireUser, validate } from "../middleware";
import {
  createSkillSchema,
  getSkillSchema,
  updateSkillSchema,
} from "../schema/skill.schema";

function skillRoutes(app: Express) {
  app.post(
    "/api/skills",
    [requireUser, validate(createSkillSchema)],
    createSkillHandler
  );
  app.get("/api/skills", getAllSkillHandler);
  app.put(
    "/api/skills/:skillId",
    validate(updateSkillSchema),
    updateSkillHandler
  );

  app.delete(
    "/api/skills/:skillId",
    [requireUser, validate(getSkillSchema)],
    deleteSkillHandler
  );
}

export default skillRoutes;
