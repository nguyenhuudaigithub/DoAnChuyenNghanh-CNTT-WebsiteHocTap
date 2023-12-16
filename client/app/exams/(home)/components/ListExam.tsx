'use client';

import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import ListExamOfCategory from './ListExamOfCategory';
import SearchExam from './SearchExam';

const ListExam = () => {
  const { data, isLoading } = useGetUserAllCoursesQuery({});

  const { data: categoriesData } = useGetHeroDataQuery('Categories', {});

  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setCourses(data);
  }, []);

  const categories = categoriesData?.layout?.categories;

  return (
    <div className='w-full p-5 h-full'>
      <div className='flex-col flex gap-5 justify-center items-center'>
        <h2 className='text-[3.25rem] font-semibold dark:text-white text-black'>
          Bạn sẽ học gì hôm nay?
        </h2>
        <div className='w-full justify-center flex'>
          <SearchExam />
        </div>
        <div className='flex flex-row gap-3 justify-center items-center flex-wrap'>
          {categories &&
            categories.map((category: any) => (
              <div
                key={category?._id}
                className='px-8 py-3 shadow-lg border border-blue-400 dark:text-white text-black hover:!bg-red-500 cursor-pointer'
              >
                {category?.title}
              </div>
            ))}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {categories &&
          categories.map((category: any) => {
            const listExamOfCategory = data?.course?.filter(
              (exam: any) => exam?.category == category?._id
            );
            return (
              <ListExamOfCategory
                key={category?._id}
                exams={listExamOfCategory}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ListExam;
