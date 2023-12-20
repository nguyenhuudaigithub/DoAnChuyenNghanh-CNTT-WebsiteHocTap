import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { useGetAllChatQuery } from "@/redux/features/chat/chatApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../Loader/Loader";

type Props = {
  data: any;
};

function Sidebar({ data }: Props) {
  const [chats, setChats] = useState([]);
  const { data: dataChats, isLoading: isLoadingChat } = useGetAllChatQuery(
    undefined,
    {}
  );

  const id = data?.user._id;
  useEffect(() => {
    if (dataChats) {
      const filteredChats = data?.user.chats
        .map((userChat: any) =>
          dataChats?.chats.find((chat: any) => chat._id === userChat._id)
        )
        .filter((chat: any) => chat !== undefined);
      setChats(filteredChats);
    }
  }, [data, dataChats]);

  return (
    <>
      {isLoadingChat ? (
        <Loader />
      ) : (
        <>
          <header className="p-4 border-b border-gray-300 flex justify-between items-center dark:bg-slate-600 bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Trò Chuyện</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z"></path>
                </svg>
              </button>
            </div>
          </header>
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {chats &&
              chats.map((item: any, index: number) => (
                <ChatCard key={index} item={item} id={id} />
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
