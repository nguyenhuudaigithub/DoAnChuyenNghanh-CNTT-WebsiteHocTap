'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Footer from '../components/Route/Footer';
import ListCourseSearchTerm from './ListCourseSearchTerm';

type Props = {};

function page({}: Props) {
  const searchParams = useSearchParams();

  const search = searchParams?.get('title') || '';

  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      <Heading
        title='NETSKILLD'
        description='NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên'
        keywords='Học Lập Trình,MERN,Redux,Học Máy'
      />
      <ListCourseSearchTerm search={search} />
      <Footer />
    </>
  );
}

export default page;
