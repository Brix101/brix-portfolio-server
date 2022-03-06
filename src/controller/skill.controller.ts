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

const createSkillHandler = async (
  req: Request<{}, {}, CreateSkillInput["body"]>,
  res: Response
) => {
  try {
    const skill = await createSkill(req.body);
    return res.send(skill);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

const getAllSkillHandler = async (req: Request, res: Response) => {
  const skill = await getAllSkill();
  return res.send(skill);
};

const updateSkillHandler = async (
  req: Request<UpdateSkillInput["params"]>,
  res: Response
) => {
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
};

const deleteSkillHandler = async (
  req: Request<GetSkillInput["params"]>,
  res: Response
) => {
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
};

export {
  createSkillHandler,
  getAllSkillHandler,
  updateSkillHandler,
  deleteSkillHandler,
};
