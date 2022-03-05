import mongoose from "mongoose";

export interface TagDocument extends mongoose.Document {
  name: String;
}

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TagModel = mongoose.model<TagDocument>("Tag", tagSchema);

export default TagModel;
