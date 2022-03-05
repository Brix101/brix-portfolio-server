import mongoose from "mongoose";

// Todo Please update the skill model and add schema,services,controller and routes
export interface SkillDocument extends mongoose.Document {
  name: String;
}

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SkillModel = mongoose.model<SkillDocument>("Skill", skillSchema);

export default SkillModel;
