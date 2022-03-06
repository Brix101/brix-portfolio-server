import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is Required",
    }),
    imageLink: string({
      required_error: "Image Link is Required",
    }),
  }),
};
const params = {
  params: object({
    skillId: string({
      required_error: "SkillId is Required",
    }),
  }),
};

export const createSkillSchema = object({ ...payload });
export const updateSkillSchema = object({
  ...payload,
  ...params,
});
export const getSkillSchema = object({ ...params });

export type CreateSkillInput = TypeOf<typeof createSkillSchema>;
export type GetSkillInput = TypeOf<typeof getSkillSchema>;
export type UpdateSkillInput = TypeOf<typeof updateSkillSchema>;
