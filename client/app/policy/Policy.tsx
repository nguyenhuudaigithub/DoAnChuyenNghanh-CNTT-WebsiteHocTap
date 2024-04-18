import React from "react";
import { styles } from "../components/styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div>
      
      <div className="w-[95%] 800px:w-[85%] m-auto py-2 text-black dark:text-white px-3">
        <h1 className={`${styles.title} !text-start pt-2`}>

          Platform terms and Condition
        </h1>
      <ul style={{listStyle: "unset", marginLeft: "15px"}}>
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            ABCDEF
        </p>
        <br/>
        <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            KBASSA
        </p>
      </ul>
      </div>
    </div>
  );
};

export default About;
