import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  CreateMessageInput,
  GetMessageInput,
  UpdateMessageInput,
} from "../schema/message.schema";
import {
  createMessage,
  deleteMessage,
  findMessage,
  getAllMessage,
  updateMessage,
} from "../service/message.service";

const createMessageHandler = async (
  req: Request<{}, {}, CreateMessageInput["body"]>,
  res: Response
) => {
  try {
    const body = req.body;
    const message = await createMessage({ ...body });
    return res.send(message);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

const getAllMessageHandler = async (req: Request, res: Response) => {
  const Message = await getAllMessage();
  return res.send(Message);
};

const updateMessageHandler = async (
  req: Request<UpdateMessageInput["params"]>,
  res: Response
) => {
  const messageId = req.params.messageId;
  const update = req.body;

  const message = await findMessage({ messageId });

  if (!message) {
    return res.sendStatus(404);
  }

  try {
    const updatedMessage = await updateMessage({ messageId }, update, {
      new: true,
    });
    return updatedMessage;
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

const deleteMessageHandler = async (
  req: Request<GetMessageInput["params"]>,
  res: Response
) => {
  const messageId = req.params.messageId;
  const message = await findMessage({ messageId });

  if (!message) {
    return res.sendStatus(404);
  }

  try {
    await deleteMessage({ messageId });
    return res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
};

export {
  createMessageHandler,
  getAllMessageHandler,
  updateMessageHandler,
  deleteMessageHandler,
};
