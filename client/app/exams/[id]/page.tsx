'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Divider } from '@mui/material';
import WidgetWrapper from './components/WidgetWrapper';
import Instructions from './Instructions';
import Image from 'next/image';
import StartExam from './StartExam';

const ExamPage = () => {
  const params = useParams();
  const [examData, setExamData] = useState<any>();
  const [view, setView] = useState('instructions');
  const [questions, setQuestions] = useState<any>([]);

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
              <StartExam
                setResult={setResult}
                setView={setView}
                questions={questions}
                examData={examData}
              />
            )}

            {view === 'result' && (
              <div className='w-full h-full m-3 flex flex-col gap-5'>
                <div className='flex justify-center'>
                  <Image
                    width={250}
                    height={350}
                    className='bg-transparent'
                    priority={true}
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
                    Trở lại trang Bài Tập
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
