'use client';

import React, { useState } from 'react';

import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminProtected from '../../../../hooks/adminProtected';
import AddEditExam from '@/app/components/Admin/Exams/AddEditExam';

const LayoutAdminAddExam = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AdminProtected>
        <Heading
          title='NETSKILLD - Admin'
          description='NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên'
          keywords='Học Lập Trình,MERN,Redux,Học Máy'
        />
        <div className='flex'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
          <div className='w-[85%] h-full'>
            <DashboardHeader open={open} setOpen={setOpen} />
            <AddEditExam />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default LayoutAdminAddExam;
