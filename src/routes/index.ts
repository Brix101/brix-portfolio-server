import { Request, Response, Express } from "express";
import MessageRoutes from "./message.route";
import projectRoutes from "./project.route";
import sessionRoutes from "./session.route";
import skillRoutes from "./skill.route";
import tagRoutes from "./tag.route";
import userRoutes from "./user.route";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    const userAgent = req.get("user-agent") || "";
    res.status(200).send(`Hello ${userAgent} user`);
  });

  MessageRoutes(app);
  projectRoutes(app);
  sessionRoutes(app);
  skillRoutes(app);
  tagRoutes(app);
  userRoutes(app);
}

export default routes;
