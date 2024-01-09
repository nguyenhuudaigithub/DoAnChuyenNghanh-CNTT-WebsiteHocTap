"use client";

import React, { useEffect, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Header from "@/app/components/Header";
import Heading from "@/app/utils/Heading";
import Loader from "@/app/components/Loader/Loader";
import Chat from "@/app/components/Chat/Chat";

import MainChat from "@/app/components/Chat/MainChat";

type Props = {
  params: any;
};

function page({ params }: Props) {
  const id = params.id;
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const isAdmin = false;
  const { isLoading, data } = useLoadUserQuery(undefined, {});
  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      <Heading
        title="NETSKILLD"
        description="NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên"
        keywords="Học Lập Trình,MERN,Redux,Học Máy"
      />
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex h-screen overflow-hidden">
              <Chat data ={data} isAdmin={false}/>
              <MainChat data={data} id={id} isAdmin={isAdmin}/>
            </div>
          </>
        )}
      </>
    </>
  );
}

export default page;
