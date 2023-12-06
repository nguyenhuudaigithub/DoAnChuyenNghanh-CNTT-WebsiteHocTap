'use client';
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Route/Footer';
type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState('Login');
  return (
    <div className='h-full w-full'>
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
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default page;
