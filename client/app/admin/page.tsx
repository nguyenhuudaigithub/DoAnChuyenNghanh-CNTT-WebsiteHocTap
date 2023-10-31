'use client';
import React from 'react';
import Heading from '../utils/Heading';
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar';
import AdminProtected from '../hooks/adminProtected';
import DashboardHero from '../components/Admin/DashboardHero';
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title='NETSKILLD - Admin'
          description='NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên'
          keywords='Học Lập Trình,MERN,Redux,Học Máy'
        />
        <div className='flex h-[200vh]'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
        </div>
        <div className='w-[85%]'>
          <DashboardHero />
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
