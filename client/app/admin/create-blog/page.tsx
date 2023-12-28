'use client';
import React, { useState } from 'react';

import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import CreateBlog from '@/app/components/Admin/Blog/CreateBlog';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Heading
        title='NETSKILLD - Admin'
        description='NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên'
        keywords='Học Lập Trình,MERN,Redux,Học Máy'
      />
      <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHeader open={open} setOpen={setOpen} />;
          <CreateBlog />
        </div>
      </div>
    </div>
  );
};

export default page;
