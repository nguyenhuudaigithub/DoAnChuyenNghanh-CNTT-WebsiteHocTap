"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Route/Footer";
type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");
  return (
    <div className="min-h-screen">
      <Heading
        title="FAQ - Elearning"
        description="Elearning is a learning management system for helping programers."
        keywords="programming, mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <br/>
      <FAQ/>
      <Footer/>
    </div>
  );
};

export default page;
