import React from "react";
import Sidebar from "./Sidebar";

type Props = {
  data: any;
  isAdmin: boolean;
};

function Chat({ data, isAdmin}: Props) { 
  return (
    <>
      <div className="w-1/4 dark:bg-slate-600bg-white border-r border-gray-300">
        <Sidebar data={data} isAdmin={isAdmin}/>      
      </div>
    </>
  );
}

export default Chat;
