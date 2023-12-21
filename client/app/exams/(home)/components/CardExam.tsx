import React from 'react';

const CardExam = ({ exam, category }: any) => {
  return (
    <a
      href={`/exams/${exam?._id}`}
      className='flex flex-col px-5 py-2 w-[20%] border border-red-400 justify-center items-center rounded-lg shadow-md hover:bg-opacity-60 cursor-pointer bg-gradient-to-r from-[#b15ff9] to-[#8f41ee] bg-transparent'
    >
      <h3 className='text-yellow-300 font-semibold text-2xl pb-2'>
        {exam.name}
      </h3>
      <h4>
        <span className='flex justify-between flex-col'>
          <span className='text-white'>
            Thể loại: <span>{category.title}</span>
          </span>
          {/* <span className='text-white '>
            Thời lượng: <span>{exam.duration}</span>
          </span> */}
          <span className='text-white '>
            Tổng số câu: <span>{exam.questions.length}</span>
          </span>
        </span>
      </h4>
    </a>
  );
};

export default CardExam;
