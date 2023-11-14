'use client';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React from 'react';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import EditHero from '@/app/components/Admin/Customization/EditHero';

type Props = {};

function page({}: Props) {
  return (
    <div>
      <AdminProtected>
        <Heading
          title='Elearning - Admin'
          description='ELearning is a platform for students to learn and get help from teachers'
          keywords='Programming,HERN,Redux,Machine Learning'
        />
        <div className='flex h-screen'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
          <div className='w-[85%]'>
            <DashboardHero />
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
}

export default page;
