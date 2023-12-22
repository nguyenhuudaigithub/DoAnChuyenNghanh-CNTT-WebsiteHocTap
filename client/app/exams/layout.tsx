'use client';

import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Footer from '../components/Route/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState('Login');

  return (
    <div className='h-[100vh] w-full overflow-y-auto'>
      <Heading
        title='Bài Test - Netskilld'
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
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
