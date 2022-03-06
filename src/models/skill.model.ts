import mongoose from "mongoose";

// Todo Please update the skill model and add schema,services,controller and routes
export interface SkillDocument extends mongoose.Document {
  title: String;
  imageLink: String;
}

const skillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SkillModel = mongoose.model<SkillDocument>("Skill", skillSchema);

export default SkillModel;
