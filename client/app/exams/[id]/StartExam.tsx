import React, { useState } from 'react';
import toast from 'react-hot-toast';
import TimerTest from './components/TimerTest';

type ExamProps = {
  setResult: any;
  setView: any;
  questions: any[];
  examData: any;
};

const StartExam = ({ setResult, setView, questions, examData }: ExamProps) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<any>({});

  const calculateResult = () => {
    let correctAnswers: any = [];
    let wrongAnswers: any = [];

    questions.forEach((question: any, index: number) => {
      if (selectedOptions[index] === undefined) {
        wrongAnswers.push(question);
      } else if (question?.correctOption === selectedOptions[index]) {
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

  return (
    <div className='flex flex-col gap-4 justify-around '>
      <h1 className='text-3xl text-green-400 mt-4'>
        <span className='text-green-300 font-semibold'>
          {selectedQuestionIndex + 1}.
        </span>{' '}
        {questions[selectedQuestionIndex]?.name}
        <div className='mt-5'>
          <p className='text-2xl text-orange-300'>
            Thời gian còn lại:{' '}
            <TimerTest
              examData={examData}
              selectedOptions={selectedOptions}
              calculateResult={calculateResult}
            />
          </p>
        </div>
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
                    {questions[selectedQuestionIndex]?.options[option]}
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
              if (Object.keys(selectedOptions).length < questions.length) {
                toast.error('Còn câu hỏi chưa làm trong thời gian quy định');
                return;
              }
              calculateResult();
            }}
          >
            Nộp bài
          </button>
        )}
      </div>
    </div>
  );
};

export default StartExam;
