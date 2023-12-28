import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IBlog extends Document {
  title: string;
  tags: string;
  description: string;
  thumbnail: object;
  questions: IComment[];
  detail: string;
  display: boolean;
}

interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies?: IComment[];
}

const commentSchema = new Schema<IComment>(
  {
    user: Object,
    question: String,
    questionReplies: [Object],
  },
  { timestamps: true }
);

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    questions: [commentSchema],
    display: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BlogModel: Model<IBlog> = mongoose.model("Blog", blogSchema);

export default BlogModel;
