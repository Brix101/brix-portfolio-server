import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ProjectDocument extends mongoose.Document {
  user: UserDocument["_id"];
  name: String;
  description: String;
  link: String;
  image: String;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String },
    link: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model<ProjectDocument>("Project", projectSchema);

export default ProjectModel;
