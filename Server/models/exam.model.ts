import mongoose, { Document, Schema } from 'mongoose';

interface IExam extends Document {
  name: string;
  duration: number;
  category: string;
  totalMarks: number;
  passingMarks: number;
  questions: mongoose.Schema.Types.ObjectId[];
}

const examSchema: Schema<IExam> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    passingMarks: {
      type: Number,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Exam = mongoose.model<IExam>('Exam', examSchema);
