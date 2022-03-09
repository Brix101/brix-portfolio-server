import { Request, Response } from "express";
import {
  CreateTagInput,
  DeleteTagInput,
  GetTagInput,
  UpdateTagInput,
} from "../schema/tag.schema";
import {
  createTag,
  deleteTag,
  findTag,
  getAllTag,
  updateTag,
} from "../service/tag.service";
import logger from "../utils/logger";

const createTagHandler = async (
  req: Request<{}, {}, CreateTagInput["body"]>,
  res: Response
) => {
  try {
    const tag = await createTag(req.body);
    return res.send(tag);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

const getAllTagHandler = async (req: Request, res: Response) => {
  const tag = await getAllTag();
  return res.send(tag);
};

const updateTagHandler = async (
  req: Request<UpdateTagInput["params"]>,
  res: Response
) => {
  const tagId = req.params.tagId;
  const update = req.body;

  const tag = await findTag({ tagId });

  if (!tag) {
    return res.status(404).send("Tag Not Found");
  }

  try {
    const updatedSkill = await updateTag({ tagId }, update, {
      new: true,
    });
    return updatedSkill;
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

const deleteTagHandler = async (
  req: Request<DeleteTagInput["params"]>,
  res: Response
) => {
  const tagId = req.params.tagId;
  const tag = await findTag({ tagId });

  if (!tag) {
    return res.status(404).send("Tag Not Found");
  }

  try {
    await deleteTag({ tagId });
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
};

export {
  createTagHandler,
  getAllTagHandler,
  updateTagHandler,
  deleteTagHandler,
};
