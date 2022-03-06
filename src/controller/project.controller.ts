import { Request, Response } from "express";
import {
  CreateProjectInput,
  GetProjectInput,
  UpdateProjectInput,
} from "../schema/project.schema";
import {
  createProject,
  findProject,
  updateProject,
  deleteProject,
  getAllProject,
} from "../service/project.service";
import logger from "../utils/logger";

const createProjectHandler = async (
  req: Request<{}, {}, CreateProjectInput["body"]>,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const project = await createProject({ ...body, user: userId });

    return res.send(project);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

const getAllProjectHandler = async (req: Request, res: Response) => {
  const project = await getAllProject();
  return res.send(project);
};

const getProjectHandler = async (
  req: Request<GetProjectInput["params"]>,
  res: Response
) => {
  const projectId = req.params.projectId;

  const project = await findProject({ projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  return res.send(project);
};

const updateProjectHandler = async (
  req: Request<UpdateProjectInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const projectId = req.params.projectId;
  const update = req.body;

  const project = await findProject({ projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  if (String(project.user) !== userId) {
    return res.sendStatus(403);
  }

  try {
    const updatedProject = await updateProject({ projectId }, update, {
      new: true,
    });
    return updatedProject;
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

const deleteProjectHandler = async (
  req: Request<GetProjectInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const projectId = req.params.projectId;
  const project = await findProject({ projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  if (String(project.user) !== userId) {
    return res.sendStatus(403);
  }

  try {
    await deleteProject({ projectId });
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
};

export {
  createProjectHandler,
  getAllProjectHandler,
  getProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
};
