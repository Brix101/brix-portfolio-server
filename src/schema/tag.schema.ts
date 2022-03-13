import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    tag: string({
      required_error: "Tag is Required",
    }),
  }),
};
const params = {
  params: object({
    tagId: string({
      required_error: "Tag Id is Required",
    }),
  }),
};

const createTagSchema = object({ ...payload });
const updateTagSchema = object({
  ...payload,
  ...params,
});
const getTagSchema = object({ ...payload });
const getTagbyIDSchema = object({ ...params });
const deleteTagSchema = object({ ...params });

type CreateTagInput = TypeOf<typeof createTagSchema>;
type GetTagInput = TypeOf<typeof getTagSchema>;
type GetTagbyIdInput = TypeOf<typeof getTagbyIDSchema>;
type UpdateTagInput = TypeOf<typeof updateTagSchema>;
type DeleteTagInput = TypeOf<typeof deleteTagSchema>;

export {
  createTagSchema,
  updateTagSchema,
  getTagSchema,
  getTagbyIDSchema,
  deleteTagSchema,
  CreateTagInput,
  GetTagInput,
  GetTagbyIdInput,
  UpdateTagInput,
  DeleteTagInput,
};
