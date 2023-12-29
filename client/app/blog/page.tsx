'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Heading from '../utils/Heading';
import Footer from '../components/Route/Footer';
import ListBlog from '../components/Blog/ListBlog';

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
          activeItem={2}
        />
        <Heading
          title='NETSKILLD'
          description='NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên'
          keywords='Học Lập Trình,MERN,Redux,Học Máy'
        />
        <div className='min-h-screen'>
          <ListBlog />
        </div>
        <div className='mt-10'>
          <Footer />
        </div>
      </>
    </div>
  );
}

export default page;
