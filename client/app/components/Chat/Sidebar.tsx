import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { useGetAllChatMutation } from "@/redux/features/chat/chatApi";
import Loader from "../Loader/Loader";
import Link from "next/link";

type Props = {
  data: any;
  isAdmin: boolean;
};

function Sidebar({ data, isAdmin }: Props) {
  const [chats, setChats] = useState([]);
  const id = data?.user._id;
  const [getAllChat, { data: dataChats, isLoading: isLoadingChat }] =
  useGetAllChatMutation();
  console.log(isAdmin)
  useEffect(() => {
    getAllChat({
      chatAdmin: isAdmin,
    });
  }, [isAdmin]);

  useEffect(() => {
    setChats(dataChats?.data);
  }, [dataChats]);

  return (
    <>
      {isLoadingChat ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
}

export default Sidebar;
