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

const createSkillSchema = object({ ...payload });
const updateSkillSchema = object({
  ...payload,
  ...params,
});
const getSkillSchema = object({ ...params });

type CreateSkillInput = TypeOf<typeof createSkillSchema>;
type GetSkillInput = TypeOf<typeof getSkillSchema>;
type UpdateSkillInput = TypeOf<typeof updateSkillSchema>;

export {
  createSkillSchema,
  updateSkillSchema,
  getSkillSchema,
  CreateSkillInput,
  GetSkillInput,
  UpdateSkillInput,
};
