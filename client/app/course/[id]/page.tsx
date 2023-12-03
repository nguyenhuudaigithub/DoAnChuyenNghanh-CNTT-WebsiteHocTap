'use client';
import Footer from '@/app/components/Route/Footer';
import CourseDetailsPage from '../../components/Course/CourseDetailsPage';
import React, { useState } from 'react';
import Heading from '@/app/utils/Heading';
import Header from '@/app/components/Header';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
const Page = ({ params }: any) => {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(params.id);

  //   console.log(data);

  return (
    <div className='min-h-screen w-full'>
      <Heading
        title={data?.course?.name}
        description={'NetSkillD Học Lập Trình'}
        keywords={data?.course?.tags}
      />
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      <div className='min-h-screen'>
        <CourseDetailsPage id={params?.id} />
      </div>
      <Footer />
    </div>
  );
};
export default Page;
