import React from "react";
import { styles } from "../components/styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is{" "}
        <span className="text-gradient" style={{ color: "blue" }}>
          NETSKILL?
        </span>
      </h1>

      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className=" text-[18px] font-Poppins">
          ABC
          <br />
          <br />
          DEF
          <br />
          <br />
        </p>
        <br />
        <span className="text-[22px]">BVS</span>
        <h5 className="text-[18] font-Poppins">Founder and CEO of NETSKILL</h5>
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
