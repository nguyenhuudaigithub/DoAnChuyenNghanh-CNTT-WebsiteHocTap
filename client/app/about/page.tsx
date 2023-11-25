"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import About from "./About";
import Footer from "../components/Route/Footer";
type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="About us - Elearning"
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
      <About 
      />
      <Footer/>
    </div>
  );
};

export default page;
