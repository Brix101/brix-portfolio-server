import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ProjectModel, { ProjectDocument } from "../models/project.model";

const createProject = async (
  input: DocumentDefinition<Omit<ProjectDocument, "createdAt" | "updatedAt">>
) => {
  try {
    return await ProjectModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};
const getAllProject = async () => {
  return ProjectModel.find();
};
const findProject = async (
  query: FilterQuery<ProjectDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ProjectModel.findOne(query, {}, options);
};
const updateProject = async (
  query: FilterQuery<ProjectDocument>,
  update: UpdateQuery<ProjectDocument>,
  options: QueryOptions
) => {
  return ProjectModel.findOne(query, update, options);
};
const deleteProject = async (query: FilterQuery<ProjectDocument>) => {
  return ProjectModel.deleteOne(query);
};

export {
  createProject,
  getAllProject,
  findProject,
  updateProject,
  deleteProject,
};
