import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import MessageModel, { MessageDocument } from "../models/message.model";

const createMessage = async (
  input: DocumentDefinition<Omit<MessageDocument, "viewed">>
) => {
  try {
    return await MessageModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllMessage = async () => {
  return MessageModel.find();
};
const findMessage = async (
  query: FilterQuery<MessageDocument>,
  options: QueryOptions = { lean: true }
) => {
  return MessageModel.findOne(query, {}, options);
};

const deleteMessage = async (query: FilterQuery<MessageDocument>) => {
  return MessageModel.deleteOne(query);
};

export { createMessage, getAllMessage, findMessage, deleteMessage };
