'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import { styles } from '../components/styles/style';
import CourseCard from '../components/Course/CourseCard';
import TfIdfSearch from '../utils/TfIdfSearch';

type Props = {};

function page({}: Props) {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title') || '';
  
  const { data,isLoading } = useGetUserAllCoursesQuery({});

  const { data: categoriesData } = useGetHeroDataQuery('Categories', {});

  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    if (category === 'All') {
      setCourses(data?.course);
    }
    if (category !== 'All') {
      setCourses(
        data?.course?.filter((item: any) => item?.categories === category)
      );
    }
    if (search) {
      if (search.length <= 1) {
        setCourses(
          data?.course?.filter((item: any) =>
            item?.name?.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        const tfIdfSearch = new TfIdfSearch(data?.course);
        const searchResults = tfIdfSearch.weights(search);
        const results: any = searchResults
          .filter((result) => result.weight > 0)
          .sort((a, b) => b.weight - a.weight);

        setCourses(results.map((result: any) => result.doc));
      }
    }
  }, [data, category, search,isLoading]);

  const categories = categoriesData?.layout?.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className='w-[95%] 800px:w-[85%] m-auto min-h-[70vh]'>
            <Heading
              title='NETSKILLD'
              description='NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên'
              keywords='Học Lập Trình,MERN,Redux,Học Máy'
            />
            <br />
            <div className='w-full flex items-center flex-wrap'>
              <div
                className={`h-[35px] ${
                  category === 'All' ? 'bg-[crimson]' : 'bg-[#5050cb]'
                } m-3 px-3 rounded-[36px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory('All')}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item?.title
                          ? 'bg-[crimson]'
                          : 'bg-[#5050cb]'
                      } m-3 px-3 rounded-[38px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item?.title)}
                    >
                      {item?.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? 'No courses found!'
                  : 'No courses found in this category. Please try another one!'}
              </p>
            )}
            <br />
            <br />
            <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-3'>
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default page;
