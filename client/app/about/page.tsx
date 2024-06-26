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
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState('Login');
  return (
    <div className='h-[100vh] overflow-hidden'>
      <Heading
        title='About us - Elearning'
        description='Elearning is a learning management system for helping programers.'
        keywords='programming, mern'
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
