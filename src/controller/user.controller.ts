import { Request, Response } from "express";
import { omit } from "lodash";
import UserModel from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

interface loginInput {
  email: string;
  password: string;
}

interface message {
  message: string;
  user: any;
}

const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

const validatePassword = async ({ email, password }: loginInput) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    const userMessage: message = { message: "Invalid Email", user: false };
    return userMessage;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    const passwordMessage: message = {
      message: "Invalid Password",
      user: false,
    };
    return passwordMessage;
  }
  const successMessage: message = {
    message: "",
    user: omit(user.toJSON(), "password"),
  };
  return successMessage;
};

export { createUserHandler, validatePassword };
