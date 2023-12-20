"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Footer from "../components/Route/Footer";
import Chat from "../components/Chat/Chat";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../components/Loader/Loader";

type Props = {};

function page({}: Props) {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

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
          <div>
            <Chat data={data}/>
          </div>
        )}
      </>
    </>
  );
}

export default page;
