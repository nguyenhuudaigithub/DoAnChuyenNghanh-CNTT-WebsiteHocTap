'use client';
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Footer from '../components/Route/Footer';
import History from './History';
type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState('Login');

  return (
    <div className='h-[100vh] w-full overflow-y-auto'>
      <Heading
        title='About us - Netskilld'
        description='Netskilld is a learning management system for helping programers.'
        keywords='programming, mern'
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className='min-h-[74vh] w-full grid grid-cols-1 grid-rows-1 my-5'>
        <History />
      </div>
      <Footer />
    </div>
  );
};

export default page;
