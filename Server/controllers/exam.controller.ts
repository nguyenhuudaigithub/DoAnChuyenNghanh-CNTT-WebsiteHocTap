import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { Exam } from '../models/exam.model';
import { Question } from '../models/question.model';
import LayoutModel from '../models/layout.model';

export const addExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const examExist = await Exam.findOne({ name: req.body.name });
    if (examExist) {
      return res.status(400).send({
        message: 'Exam already exist',
        success: false,
      });
    }

    req.body.questions = [];

    const newExam = new Exam(req.body);
    await newExam.save();

    return res.status(201).send({
      success: true,
      message: 'Exam added successfully',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getAllExams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exams = await Exam.find({}).populate('category').lean();

    return res.status(200).send({
      success: true,
      data: exams,
      message: 'Exams fetched successfully',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getExamById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exams = await Exam.findById(req.body.examId).populate('questions');
    return res.status(200).send({
      success: true,
      data: exams,
      message: 'Exam fetched successfully',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const editExamById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Exam.findByIdAndUpdate(req.body.examId, req.body);
    return res.status(200).send({
      success: true,
      message: 'Exam edited successfully',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const deleteExamById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Exam.findByIdAndDelete(req.body.examId);
    return res.status(200).send({
      success: true,
      message: 'Exam deleted successfully',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const addQuestionToExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newQuestion = new Question(req.body);
    const question = await newQuestion.save();

    const exam = await Exam.findById(req.body.exam);
    const questionFind = await Question.findById(question._id);
    await Exam.findByIdAndUpdate(
      { _id: req.body.exam },
      {
        $push: {
          questions: question._id,
        },
      }
    );

    return res.status(201).send({
      success: true,
      message: 'Question added successfully',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const editQuestionToExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Question.findByIdAndUpdate(req.body.questionId, req.body);
    return res.status(200).send({
      success: true,
      message: 'Question edited successfully',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const deleteQuestionToExam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Exam.findByIdAndUpdate(
      { _id: req.body.examId },
      {
        $pull: {
          questions: req.body.questionId,
        },
      }
    );

    await Question.findByIdAndDelete(req.body.questionId);

    // delete question in exam
    // const exam: any = await Exam.findById(req.body.examId);
    // exam.questions = await exam.questions.filter(
    //   (question: any) => question._id !== req.body.questionId
    // );
    // await exam.save();

    return res.status(200).send({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
};
