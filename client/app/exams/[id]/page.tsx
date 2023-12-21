'use client';

import { useGetExamByIdMutation } from '@/redux/features/exams/examsApi';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Divider } from '@mui/material';
import WidgetWrapper from './components/WidgetWrapper';
import Instructions from './Instructions';
import Image from 'next/image';
import toast from 'react-hot-toast';

const ExamPage = () => {
  const params = useParams();
  const [examData, setExamData] = useState<any>();
  const [view, setView] = useState('instructions');
  const [questions, setQuestions] = useState<any>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [result, setResult] = useState<any>({});

  const getExamData = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/get-exam-by-id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: params?.id,
        }),
      }
    );

    const data = await response.json();
    setQuestions(data?.data?.questions);
    setExamData(data?.data);
  };

  const calculateResult = () => {
    if (Object.keys(selectedOptions).length < questions.length) {
      toast.error('Còn câu hỏi chưa làm');
      return;
    }
    let correctAnswers: any = [];
    let wrongAnswers: any = [];

    questions.forEach((question: any, index: number) => {
      if (question.correctOption == selectedOptions[index]) {
        correctAnswers.push(question);
      } else {
        wrongAnswers.push(question);
      }
    });

    let verdict = 'Pass';
    if (correctAnswers.length < examData?.passingMarks) {
      verdict = 'Fail';
    }
    setResult({
      correctAnswers,
      wrongAnswers,
      verdict,
    });
    setView('result');
  };

  useEffect(() => {
    if (params?.id) {
      getExamData();
    }
  }, []);

  return (
    <div className='flex flex-col gap-5 h-full w-full dark:!text-white !text-black'>
      <WidgetWrapper>
        {examData && (
          <div className='text-center w-[70%] items-center justify-center mx-auto'>
            <Divider />
            <h1 className='text-4xl text-red-400 py-3 font-bold text-center'>
              {examData?.name}
            </h1>
            <Divider />
            {view === 'instructions' && (
              <Instructions examData={examData} view={view} setView={setView} />
            )}

            {view === 'questions' && (
              <div className='flex flex-col gap-4 justify-around '>
                <h1 className='text-3xl text-green-400 mt-4'>
                  <span className='text-green-300 font-semibold'>
                    {selectedQuestionIndex + 1}.
                  </span>{' '}
                  {questions[selectedQuestionIndex]?.name}
                </h1>

                <div className='flex flex-col justify-around gap-5'>
                  {questions[selectedQuestionIndex]?.options &&
                    Object.keys(questions[selectedQuestionIndex]?.options).map(
                      (option, index) => {
                        return (
                          <div
                            className={`${
                              selectedOptions[selectedQuestionIndex] == option
                                ? 'selected-option bg-orange-300'
                                : 'option'
                            } cursor-pointer hover:bg-fuchsia-300 py-2 inline-block`}
                            key={index}
                            onClick={() => {
                              setSelectedOptions({
                                ...selectedOptions,
                                [selectedQuestionIndex]: option,
                              });
                            }}
                            style={{
                              marginTop: 3,
                              marginBottom: 3,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 2,
                              alignItems: 'center',
                            }}
                          >
                            <span className='text-xl  text-center'>
                              {option} :{' '}
                              {questions[selectedQuestionIndex].options[option]}
                            </span>
                          </div>
                        );
                      }
                    )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  className='mt-10 gap-5'
                >
                  {selectedQuestionIndex > 0 && (
                    <button
                      className='outline-orange-300 text-white'
                      style={{
                        background: 'blue',
                        padding: '4px 8px',
                        width: '400px',
                        height: '50px',
                        marginTop: 5,
                      }}
                      onClick={() => {
                        setSelectedQuestionIndex(selectedQuestionIndex - 1);
                      }}
                    >
                      Trở về
                    </button>
                  )}
                  {selectedQuestionIndex < questions.length - 1 && (
                    <button
                      className='outline-yellow-600 text-white'
                      style={{
                        background: 'purple',
                        padding: '4px 8px',
                        width: '400px',
                        height: '50px',
                        marginTop: 5,
                        marginLeft: 'auto',
                      }}
                      onClick={() => {
                        setSelectedQuestionIndex(selectedQuestionIndex + 1);
                      }}
                    >
                      Tiếp tục
                    </button>
                  )}

                  {selectedQuestionIndex === questions.length - 1 && (
                    <button
                      className='outline-yellow-600'
                      style={{
                        background: '#00FFCA',
                        padding: '4px 8px',
                        width: '400px',
                        height: '50px',
                        marginTop: 5,
                        marginLeft: 'auto',
                      }}
                      onClick={() => {
                        calculateResult();
                      }}
                    >
                      Nộp bài
                    </button>
                  )}
                </div>
              </div>
            )}

            {view === 'result' && (
              <div className='w-full h-full m-3 flex flex-col gap-5'>
                <div className='flex justify-center'>
                  <Image
                    width={250}
                    height={350}
                    className='bg-transparent'
                    src={
                      result.verdict !== 'Fail'
                        ? require('../../../public/images/win.png')
                        : require('../../../public/images/lost.png')
                    }
                    alt='result'
                  />
                </div>
                <h2 className='text-5xl dark:text-white text-black font-extrabold text-center'>
                  {result.verdict !== 'Fail' ? (
                    <span>Congrats!</span>
                  ) : (
                    <span>You lose!</span>
                  )}
                </h2>

                <div className='text-center'>
                  <h1 className='text-2xl'>Số điểm của bạn</h1>
                  <h1 className='text-3xl font-bold'>
                    {result.correctAnswers.length} / {examData.totalMarks}
                  </h1>
                  <button
                    className='px-8 py-4 bg-green-400 rounded-md mt-8 text-white'
                    onClick={() => (window.location.href = '/exams')}
                  >
                    Trang Bài Test
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </WidgetWrapper>
    </div>
  );
};

export default ExamPage;
