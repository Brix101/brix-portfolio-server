import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ProjectModel, { ProjectDocument } from "../models/project.model";

export const createProject = async (
  input: DocumentDefinition<Omit<ProjectDocument, "createdAt" | "updatedAt">>
) => {
  try {
    return await ProjectModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllProject = async () => {
  return ProjectModel.find();
};
export const findProject = async (
  query: FilterQuery<ProjectDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ProjectModel.findOne(query, {}, options);
};
export const updateProject = async (
  query: FilterQuery<ProjectDocument>,
  update: UpdateQuery<ProjectDocument>,
  options: QueryOptions
) => {
  return ProjectModel.findOne(query, update, options);
};
export const deleteProject = async (query: FilterQuery<ProjectDocument>) => {
  return ProjectModel.deleteOne(query);
};
