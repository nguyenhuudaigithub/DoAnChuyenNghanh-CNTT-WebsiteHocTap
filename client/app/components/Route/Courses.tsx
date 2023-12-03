import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react';
import CourseCard from '../Course/CourseCard';

type Props = {};
const Courses = (props: Props) => {
  const { data, refetch } = useGetUserAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.course);
  }, [data]);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1
          className='text-[220%] text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-600'
        >
          Mở Rộng Sự Nghiệp Của <span className='dark:text-[#8ff1eb] text-[#26504d]'><b>Bạn</b></span>
          <br />
          Với Những Khóa Học Của Chúng Tôi
        </h1>
        <br />
        <br />
        <div
          className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px]
        lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'
        >
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
