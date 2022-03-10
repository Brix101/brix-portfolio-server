import { Request, Response } from "express";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import { validatePassword } from "./user.controller";
import config from "config";

const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validate the user's password
  const { message, user } = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send(message);
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
  );

  // return access & refresh tokens
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.send({ user: true });
};
const getUserSessionHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
};

const isUserSessionHandler = async (req: Request, res: Response) => {
  return res.send({ user: true });
};

const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.send({ user: false });
};

export {
  createUserSessionHandler,
  getUserSessionHandler,
  isUserSessionHandler,
  deleteSessionHandler,
};
