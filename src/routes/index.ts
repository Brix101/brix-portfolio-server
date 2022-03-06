import { Request, Response, Express } from "express";
import projectRoutes from "./project.route";
import sessionRoutes from "./session.route";
import skillRoutes from "./skill.route";
import userRoutes from "./user.route";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    const userAgent = req.get("user-agent") || "";
    res.status(200).send(`Hello ${userAgent} user`);
  });

  projectRoutes(app);
  sessionRoutes(app);
  skillRoutes(app);
  userRoutes(app);
}

export default routes;
