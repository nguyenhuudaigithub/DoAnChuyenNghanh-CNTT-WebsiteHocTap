// components/CourseCard.js
import Link from 'next/link';
import React from 'react';
import Ratings from '../utils/Ratings';
import { format } from 'timeago.js';
import Image from 'next/image';

const CourseCardHistory = ({ course }: { course: any }) => {
  return (
    <div
      className='flex flex-row rounded overflow-auto shadow-lg justify-around my-4 dark:!text-white text-black'
      style={{ overflowY: 'auto' }}
    >
      <div className='rounded-lg my-auto'>
        <Image
          height={250}
          width={350}
          objectFit='cover'
          src={course?.thumbnail?.url}
          alt={course?.name}
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
      <div className='px-6 py-4 my-auto'>
        <div className='dark:text-white font-bold text-xl mb-2'>
          {course?.name}
        </div>
        {/* <p className='dark:text-white text-base'>{course?.description}</p> */}
        <p className='dark:text-white text-base'>
          {course && format(course?.createdAt)}
        </p>
        <p className='dark:text-white font-bold text-xl mt-2'>
          {course?.price === 0
            ? 'Miễn phí'
            : course?.price?.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
        </p>
        <div className='w-full flex items-center justify-between pt-2'>
          <Ratings rating={course?.ratings} />
        </div>
      </div>
      <div className='px-6 py-4 my-auto'>
        <Link
          href={`/course/${course?._id}`}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Truy cập
        </Link>
      </div>
    </div>
  );
};

export default CourseCardHistory;
