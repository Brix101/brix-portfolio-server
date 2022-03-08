import mongoose from "mongoose";

// Todo Please update the about model and add schema,services,controller and routes
export interface MessageDocument extends mongoose.Document {
  firstName: String;
  lastName: String;
  email: String;
  message: String;
  viewed: Boolean;
}

const messageSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    viewed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);

export default MessageModel;
