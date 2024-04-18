import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import Link from "next/link";
import { useGetAllChatAdminQuery, useGetAllChatUserQuery } from "@/redux/features/chat/chatApi";

type Props = {
  data: any;
  isAdmin: boolean;
};

function Sidebar({ data, isAdmin }: Props) {
  const [chats, setChats] = useState([]);
  const id = data?.user._id;
  const { data: dataUser } = useGetAllChatUserQuery(undefined,{});
  const { data: dataAdmin } = useGetAllChatAdminQuery(undefined,{});

  useEffect(() => {
    if (isAdmin) {
      setChats(dataAdmin?.data);
    } else {
      setChats(dataUser?.data);
    }
  }, [dataUser, dataAdmin]);

  return (
    <>
      <header className="p-4 border-b border-gray-300 flex justify-between items-center dark:bg-slate-600 bg-indigo-600 text-white">
        <Link href="/chat">
          <h1 className="text-2xl font-semibold">Trò Chuyện</h1>
        </Link>
      </header>
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        {chats &&
          chats.map((item: any, index: number) => (
            <ChatCard key={index} item={item} id={id} isAdmin={isAdmin} />
          ))}
      </div>
    </>
  );
}

export default Sidebar;
