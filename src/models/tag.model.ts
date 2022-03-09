import mongoose from "mongoose";

export interface TagDocument extends mongoose.Document {
  tag: String;
}

const tagSchema = new mongoose.Schema(
  {
    tag: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TagModel = mongoose.model<TagDocument>("Tag", tagSchema);

export default TagModel;
