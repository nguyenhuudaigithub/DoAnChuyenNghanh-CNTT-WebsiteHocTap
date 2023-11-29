'use client';
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Route/Footer';
import Policy from './Policy';
type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState('Login');
  return (
    <div>
      <Heading
        title='Policy - Elearning'
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
        <Policy />
      </div>
      <Footer />
    </div>
  );
};

export default page;
