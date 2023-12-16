import { apiSlice } from '../api/apiSlice';

export const examsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExams: builder.mutation({
      query: () => ({
        url: 'get-all-exams',
        method: 'POST',
        credentials: 'include' as const,
      }),
    }),
    addExam: builder.mutation({
      query: ({ name, duration, category, totalMarks, passingMarks }) => ({
        url: 'add-exam',
        method: 'POST',
        body: {
          name,
          duration,
          category,
          totalMarks,
          passingMarks,
        },
        credentials: 'include' as const,
      }),
    }),

    getExamById: builder.mutation({
      query: ({ examId }) => ({
        url: 'get-exam-by-id',
        method: 'POST',
        body: {
          examId,
        },
        credentials: 'include' as const,
      }),
    }),
    editExamById: builder.mutation({
      query: ({
        examId,
        name,
        duration,
        category,
        totalMarks,
        passingMarks,
      }) => ({
        url: 'edit-exam-by-id',
        method: 'POST',
        body: {
          examId,
          name,
          duration,
          category,
          totalMarks,
          passingMarks,
        },
        credentials: 'include' as const,
      }),
    }),
    deleteExamById: builder.mutation({
      query: ({ examId }) => ({
        url: 'delete-exam-by-id',
        method: 'POST',
        body: {
          examId,
        },
        credentials: 'include' as const,
      }),
    }),
    addQuestionToExam: builder.mutation({
      query: ({ exam, name, correctOption, options }) => ({
        url: 'add-question-to-exam',
        method: 'POST',
        body: {
          exam,
          name,
          correctOption,
          options,
        },
        credentials: 'include' as const,
      }),
    }),
    editQuestionToExam: builder.mutation({
      query: ({ questionId, name, correctOption, options }) => ({
        url: 'edit-question-to-exam',
        method: 'POST',
        body: {
          questionId,
          name,
          correctOption,
          options,
        },
        credentials: 'include' as const,
      }),
    }),
    deleteQuestionToExam: builder.mutation({
      query: ({ questionId, examId }) => ({
        url: 'edit-question-to-exam',
        method: 'POST',
        body: {
          questionId,
          examId,
        },
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const {
  useGetAllExamsMutation,
  useAddExamMutation,
  useGetExamByIdMutation,
  useEditExamByIdMutation,
  useDeleteExamByIdMutation,
  useAddQuestionToExamMutation,
  useEditQuestionToExamMutation,
  useDeleteQuestionToExamMutation,
} = examsApi;
