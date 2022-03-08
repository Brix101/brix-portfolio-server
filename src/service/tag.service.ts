import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import TagModel, { TagDocument } from "../models/tag.model";

const createTag = async (input: DocumentDefinition<TagDocument>) => {
  try {
    return await TagModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllTag = async () => {
  return TagModel.find();
};
const findTag = async (
  query: FilterQuery<TagDocument>,
  options: QueryOptions = { lean: true }
) => {
  return TagModel.findOne(query, {}, options);
};
const updateTag = async (
  query: FilterQuery<TagDocument>,
  update: UpdateQuery<TagDocument>,
  options: QueryOptions
) => {
  return TagModel.findOne(query, update, options);
};

const deleteTag = async (query: FilterQuery<TagDocument>) => {
  return TagModel.deleteOne(query);
};

export { createTag, getAllTag, findTag, updateTag, deleteTag };
