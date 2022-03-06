import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import SkillModel, { SkillDocument } from "../models/skill.model";

const createSkill = async (input: DocumentDefinition<SkillDocument>) => {
  try {
    return await SkillModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllSkill = async () => {
  return SkillModel.find();
};
const findSkill = async (
  query: FilterQuery<SkillDocument>,
  options: QueryOptions = { lean: true }
) => {
  return SkillModel.findOne(query, {}, options);
};
const updateSkill = async (
  query: FilterQuery<SkillDocument>,
  update: UpdateQuery<SkillDocument>,
  options: QueryOptions
) => {
  return SkillModel.findOne(query, update, options);
};

const deleteSkill = async (query: FilterQuery<SkillDocument>) => {
  return SkillModel.deleteOne(query);
};

export { createSkill, getAllSkill, findSkill, updateSkill, deleteSkill };
