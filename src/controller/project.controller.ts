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

//params, responsebody,req input body
export async function createProjectHandler(
  req: Request<{}, {}, CreateProjectInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const project = await createProject({ ...body, user: userId });

    return res.send(project);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getAllProjectHandler(req: Request, res: Response) {
  const project = await getAllProject();
  return res.send(project);
}

export async function getProjectHandler(
  req: Request<GetProjectInput["params"]>,
  res: Response
) {
  const projectId = req.params.projectId;

  const project = await findProject({ projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  return res.send(project);
}

export async function updateProjectHandler(
  req: Request<UpdateProjectInput["params"]>,
  res: Response
) {
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
}

export async function deleteProjectHandler(
  req: Request<GetProjectInput["params"]>,
  res: Response
) {
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
}
