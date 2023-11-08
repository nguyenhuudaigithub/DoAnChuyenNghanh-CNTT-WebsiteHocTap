'use client';
import React from 'react';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import AllInvoices from '@/app/components/Admin/Order/AllInvoices';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';

type Props = {};

const page = ({}: Props) => {
  return (
    <div>
      <Heading
        title='Elearning - Admin'
        description='ELearning is a platform for students to learn and get help from teachers'
        keywords='Programming,MERN,Redux,Machine Learning'
      />
      <div className='flex h-screen'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHeader />
          <AllInvoices />
        </div>
      </div>
    </div>
  );
};

export default page;
