'use client';

import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React, { useState } from 'react';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import EditCategories from '@/app/components/Admin/Customization/EditCategories';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';

type Props = {};

const page = ({}: Props) => {
  // const [open, setOpen] = useState(false);
  return (
    <div>
      <AdminProtected>
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
            {/* <DashboardHeader open={open} setOpen={setOpen} /> */}
            <DashboardHero />
            <EditCategories />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
