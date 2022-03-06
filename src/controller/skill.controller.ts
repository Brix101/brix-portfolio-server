import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  CreateSkillInput,
  GetSkillInput,
  UpdateSkillInput,
} from "../schema/skill.schema";
import {
  createSkill,
  deleteSkill,
  findSkill,
  getAllSkill,
  updateSkill,
} from "../service/skill.service";

export async function createSkillHandler(
  req: Request<{}, {}, CreateSkillInput["body"]>,
  res: Response
) {
  try {
    const skill = await createSkill(req.body);
    return res.send(skill);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getAllSkillHandler(req: Request, res: Response) {
  const skill = await getAllSkill();
  return res.send(skill);
}

export async function updateSkillHandler(
  req: Request<UpdateSkillInput["params"]>,
  res: Response
) {
  const skillId = req.params.skillId;
  const update = req.body;

  const skill = await findSkill({ skillId });

  if (!skill) {
    return res.sendStatus(404);
  }

  try {
    const updatedSkill = await updateSkill({ skillId }, update, {
      new: true,
    });
    return updatedSkill;
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function deleteSkillHandler(
  req: Request<GetSkillInput["params"]>,
  res: Response
) {
  const skillId = req.params.skillId;
  const skill = await findSkill({ skillId });

  if (!skill) {
    return res.sendStatus(404);
  }

  try {
    await deleteSkill({ skillId });
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
}
