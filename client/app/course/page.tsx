'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Footer from '../components/Route/Footer';
import ListCourseSearch from './ListCourseSearch';

type Props = {};

function page({}: Props) {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);

  return (
    <div>
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
        <ListCourseSearch />
        <Footer />
      </>
    </div>
  );
}

export default page;
