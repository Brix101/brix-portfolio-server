import mongoose from "mongoose";

// Todo Please update the about model and add schema,services,controller and routes
export interface AboutDocumet extends mongoose.Document {
  name: String;
}

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AboutModel = mongoose.model<AboutDocumet>("Skill", aboutSchema);

export default AboutModel;
