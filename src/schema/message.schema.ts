import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    firstName: string({
      required_error: "fistName is Required",
    }),
    lastName: string({
      required_error: "lastName is Required",
    }),
    email: string({
      required_error: "Email is Required",
    }).email("Not a valid email"),
    message: string({
      required_error: "Message Link is Required",
    }).min(120, "Message should be at least 120 characters"),
  }),
};
const params = {
  params: object({
    messageId: string({
      required_error: "messageId is Required",
    }),
  }),
};

const createMessageSchema = object({ ...payload });
const updateMessageSchema = object({
  ...payload,
  ...params,
});
const getMessageSchema = object({ ...params });

type CreateMessageInput = TypeOf<typeof createMessageSchema>;
type GetMessageInput = TypeOf<typeof getMessageSchema>;
type UpdateMessageInput = TypeOf<typeof updateMessageSchema>;

export {
  createMessageSchema,
  updateMessageSchema,
  getMessageSchema,
  CreateMessageInput,
  GetMessageInput,
  UpdateMessageInput,
};
