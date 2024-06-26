'use client';
import React, { FC, useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Footer from '../components/Route/Footer';
import Protected from '../hooks/useProtected';
import Profile from '../components/Profile/Profile';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);

  if (!user) {
    redirect('/');
  }

  return (
    <div className='h-[100vh] overflow-hidden'>
      <Protected>
        <Heading
          title='Trang Cá Nhân'
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
      </Protected>
      <div className='h-[80vh]'>
        <Profile user={user} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
