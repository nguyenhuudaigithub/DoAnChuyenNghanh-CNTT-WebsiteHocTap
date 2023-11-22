'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import Heading from '../utils/Heading';

type Props = {};

function page({}: Props) {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title');
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery('Categories', {});

  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    if (category === 'All') {
      setCourses(data?.courses);
    }
    if (category !== 'All') {
      setCourses(
        data?.courses?.filter((item: any) => item?.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses?.filter((item: any) =>
          item?.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

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
            <div className='w-full flex items-center flex-wrap'></div>
          </div>
        </>
      )}
    </div>
  );
}

export default page;
