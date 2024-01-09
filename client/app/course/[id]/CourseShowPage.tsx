import CourseDetailsPage from '@/app/components/Course/CourseDetailsPage';
import React from 'react';

type Props = {};

const CourseShowPage = ({ id }: { id: string }) => {
  return <CourseDetailsPage id={id} />;
};

export default CourseShowPage;
