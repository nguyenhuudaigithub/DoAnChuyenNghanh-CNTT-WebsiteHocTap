'use client';
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import About from './About';
import Footer from '../components/Route/Footer';
type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState('Login');
  return (
    <div className='h-[100vh] overflow-hidden'>
      <Heading
        title='Chi tiết'
        description='NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên'
        keywords='Học Lập Trình,MERN,Redux,Học Máy'
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className='h-[80vh]'>
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default page;
