"use client";
import React, { useState } from "react";

import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminProtected from "@/app/hooks/adminProtected";
import CreateNewBlog from "@/app/components/Admin/Blog/CreateNewBlog";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AdminProtected>
        <Heading
          title="NETSKILLD - Admin"
          description="NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên"
          keywords="Học Lập Trình,MERN,Redux,Học Máy"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%] min-h-screen">
            <DashboardHeader open={open} setOpen={setOpen} />;
            <CreateNewBlog />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
