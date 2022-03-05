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
    tags: object({
      tag: string({
        required_error: "projectId is required",
      }),
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

export const createProjectSchema = object({ ...payload });

export const updateProjectSchema = object({
  ...payload,
  ...params,
});

export const getProjectSchema = object({ ...params });

export type CreateProjectInput = TypeOf<typeof createProjectSchema>;
export type GetProjectInput = TypeOf<typeof getProjectSchema>;
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>;
