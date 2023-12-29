"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Route/Footer";
import Heading from "@/app/utils/Heading";
import React, { useState } from "react";
import BlogDetail from "../../components/Blog/BlogDetail";

type Props = {};

const Page = ({ params }: any) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <div>
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
        <BlogDetail id={params.id}/>
        <div className="mt-10">
          <Footer />
        </div>
      </>
    </div>
  );
};

export default Page;
