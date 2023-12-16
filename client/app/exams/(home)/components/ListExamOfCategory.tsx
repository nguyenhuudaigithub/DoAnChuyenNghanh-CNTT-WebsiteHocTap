import React from 'react';
import CardExam from './CardExam';

const ListExamOfCategory = ({ exams }: any) => {
  return (
    <div className='flex'>
      {exams &&
        exams.map((exam: any) => <CardExam key={exam?._id} exam={exam} />)}
    </div>
  );
};

export default ListExamOfCategory;
