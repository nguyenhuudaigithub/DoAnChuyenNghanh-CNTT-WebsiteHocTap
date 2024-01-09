import mongoose, { Document, Schema } from 'mongoose';

interface IQuestion extends Document {
  name: string;
  correctOption: string;
  options: Record<string, string>;
  exam: mongoose.Schema.Types.ObjectId;
}

const questionSchema: Schema<IQuestion> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    correctOption: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model<IQuestion>('Question', questionSchema);
