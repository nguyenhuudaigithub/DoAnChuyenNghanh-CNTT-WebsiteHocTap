'use client';

import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Loader from '@/app/components/Loader/Loader';
import CourseContent from '@/app/components/Course/CourseContent';

type Props = {
  params: any;
};

function page({ params }: Props) {
  const id = params.id;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data?.user?.courses?.find(
        (item: any) => item?._id === id
      );
      if (!isPurchased) {
        redirect('/');
      }
      if (error) {
        redirect('/');
      }
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
        </div>
      )}
    </>
  );
}

export default page;
