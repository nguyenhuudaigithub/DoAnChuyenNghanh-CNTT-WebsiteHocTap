'use client';

import React, { useEffect, useState } from 'react';
import SearchExam from './SearchExam';
import { useGetAllExamsQuery } from '@/redux/features/exams/examsApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import CardExam from './CardExam';

const ListExam = () => {
  const { data: categoriesData } = useGetHeroDataQuery('Categories', {});
  const { data: examList } = useGetAllExamsQuery({});
  const [term, setTerm] = useState('');

  const [categoryChange, setCategoryChange] = useState('');

  const categories = categoriesData?.layout?.categories;

  const handleCategory = (id: string) => {
    if (categoryChange == id) {
      setCategoryChange('');
    } else {
      setCategoryChange(id);
    }
  };

  const exams = term
    ? examList?.data?.filter((exam: any) => {
        const normalizedTerm = term
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        const normalizedExamName = exam.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        const lowercaseTerm = normalizedTerm.toLowerCase();
        const lowercaseExamName = normalizedExamName.toLowerCase();

        return lowercaseExamName.includes(lowercaseTerm);
      })
    : examList?.data;

  return (
    <div className='w-full p-5 h-full'>
      <div className='flex-col flex gap-5 justify-center items-center'>
        <h2 className='text-[3.25rem] font-semibold dark:text-white text-black'>
          Bạn sẽ làm bài gì hôm nay?
        </h2>
        <div className='w-full justify-center flex'>
          <SearchExam setTerm={setTerm} />
        </div>
        <div className='flex flex-row gap-3 justify-center items-center flex-wrap'>
          {categories &&
            categories.map((category: any) => (
              <div
                key={category?._id}
                className={`px-8 py-3 shadow-lg border border-blue-400 rounded-md dark:text-white text-black hover:!bg-red-500 cursor-pointer ${
                  categoryChange == category?._id ? '!bg-red-500' : ''
                }`}
                onClick={() => handleCategory(category?._id)}
              >
                {category?.title}
              </div>
            ))}
        </div>
      </div>
      <div className='flex flex-row flex-wrap gap-4 mt-7 items-center justify-center'>
        {categoryChange !== ''
          ? exams?.map((exam: any) => {
              if (exam.category == categoryChange) {
                const category = categories?.find(
                  (category: any) => category?._id == exam.category
                );
                return (
                  <CardExam key={exam?._id} exam={exam} category={category} />
                );
              }
            })
          : exams?.map((exam: any) => {
              const category = categories.find(
                (category: any) => category?._id == exam.category
              );
              return (
                <CardExam key={exam?._id} exam={exam} category={category} />
              );
            })}
      </div>
    </div>
  );
};

export default ListExam;
