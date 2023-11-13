'use client';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React from 'react';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import EditFaq from '@/app/components/Admin/Customization/EditFaq';

type Props = {};

const page = ({}: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title='NETSKILLD - Admin'
          description='NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên'
          keywords='Học Lập Trình,MERN,Redux,Học Máy'
        />
        <div className='flex h-screen'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
          <div className='w-[85%]'>
            <DashboardHero />
            <EditFaq />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
