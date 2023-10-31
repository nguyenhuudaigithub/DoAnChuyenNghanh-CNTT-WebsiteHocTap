"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="NETSKILLD - Admin"
          description="NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên"
          keywords="Học Lập Trình,MERN,Redux,Học Máy"
        />
        <div className="flex h-[200vh] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]"></div>
      </AdminProtected>
    </div>
  );
};

export default page;
