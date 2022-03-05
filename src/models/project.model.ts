import mongoose from "mongoose";
import { UserDocument } from "./user.model";

// TODO add projec link, code link,imageLink tags{tag1, tag2}
export interface tag {
  name: String;
}
export interface ProjectDocument extends mongoose.Document {
  user: UserDocument["_id"];
  name: String;
  description: String;
  link: String;
  image: String;
  tags: Array<tag>;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model<ProjectDocument>("Project", projectSchema);

export default ProjectModel;
