"use client";
import React, { useState } from "react";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminProtected from "../../hooks/adminProtected";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Chat from "@/app/components/Chat/Chat";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useLoadUserQuery(undefined, {});
  const isAdmin = true;
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
          <div className="w-[85%]">
            <DashboardHeader open={open} setOpen={setOpen} />
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="flex h-screen overflow-hidden">
                  <Chat data={data} isAdmin={isAdmin}/>
                </div>
              </>
            )}
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
