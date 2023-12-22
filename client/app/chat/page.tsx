"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Chat from "../components/Chat/Chat";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../components/Loader/Loader";
import AddFriend from "../components/Chat/AddFriend";

type Props = {};

function page({}: Props) {
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
          <div className="flex h-screen overflow-hidden">
            <Chat data={data} isAdmin={isAdmin}/>
            <AddFriend/>
          </div>
        )}
      </>
    </>
  );
}

export default page;
