import { object, string, array, any, TypeOf } from "zod";
import { tag } from "../models/project.model";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 Characters"),
    projectLink: string({
      required_error: "Code Link is required",
    }),
    codeLink: string({
      required_error: "Code Link is required",
    }),
    imageLink: string({
      required_error: "Image is required",
    }),
  }),
};
const params = {
  params: object({
    projectId: string({
      required_error: "projectId is required",
    }),
  }),
};

const createProjectSchema = object({ ...payload });

const updateProjectSchema = object({
  ...payload,
  ...params,
});

const getProjectSchema = object({ ...params });

type CreateProjectInput = TypeOf<typeof createProjectSchema>;
type GetProjectInput = TypeOf<typeof getProjectSchema>;
type UpdateProjectInput = TypeOf<typeof updateProjectSchema>;

export {
  createProjectSchema,
  updateProjectSchema,
  getProjectSchema,
  CreateProjectInput,
  GetProjectInput,
  UpdateProjectInput,
};
