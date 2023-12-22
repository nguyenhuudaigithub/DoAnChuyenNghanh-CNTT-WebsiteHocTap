import {
  useGetSingleChatQuery,
  useReplyChatMutation,
} from "@/redux/features/chat/chatApi";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import socketIO from "socket.io-client";
import Loader from "../Loader/Loader";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
import SettingsIcon from "@mui/icons-material/Settings";
import { IoMdExit } from "react-icons/io";
import { FiUsers } from "react-icons/fi";

type Message = {
  sender: string;
  content: string;
  avatar: string;
  isActive: boolean;
};

type Props = {
  data: any;
  id: string;
  isAdmin: boolean;
};

function MainChat({ data, id, isAdmin }: Props) {
  const me = data.user._id;
  const user = data.user;

  const {
    data: dataChat,
    refetch,
    isLoading,
  } = useGetSingleChatQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const dataMessage = dataChat?.chat;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
    )
  );
  const playerNotificationSound = () => {
    audio.play();
  };
  const [replyChat, { isSuccess }] = useReplyChatMutation();

  useEffect(() => {
    if (dataMessage && dataMessage.message) {
      const newMessages: Message[] = dataMessage.message.map((msg: any) => {
        const foundUser = dataMessage.group.find(
          (user: any) => user.user._id === msg.user
        );
        let avatar =
          "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png";

        if (foundUser?.user?.avatar?.url) {
          avatar = foundUser.user.avatar.url;
        }

        let imageOrmessage = msg.message;
        let isActive = false;

        if (msg?.image) {
          imageOrmessage = msg?.image;
          isActive = true;
        }

        if (
          dataMessage.group.length == 1 &&
          dataMessage.chatAdmin &&
          isAdmin == false &&
          msg.user != me
        ) {
          avatar =
            "https://img.icons8.com/?size=256&id=7hmHYH5hPLfG&format=png";
        }

        return {
          sender: msg.user,
          content: imageOrmessage,
          avatar: avatar,
          isActive: isActive,
        };
      });

      const uniqueNewMessages = newMessages.filter(
        (newMsg) => !messages.some((msg) => msg.content === newMsg.content)
      );

      setMessages((prevMessages) => [...prevMessages, ...uniqueNewMessages]);
    }
    audio.load();
  }, [dataMessage]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Gửi tin nhắn thành công");
      socket.emit("newMessage", {
        idChat: id,
        sender: user._id,
        content: message,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    socket.on("newChat", (dataM) => {
      if (dataM.idChat === id) {
        refetch();
        playerNotificationSound();
      }
    });
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage: Message = {
        sender: user._id,
        content: message,
        avatar:
          user.avatar?.url ||
          "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
        isActive: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      replyChat({
        id: id,
        data: {
          message: newMessage.content,
        },
      });
      setMessage("");
    }
  };

  let nameChat = dataMessage?.nameGroup;

  if (dataMessage?.group?.length == 2 || isAdmin) {
    const name = dataMessage?.group.find((user: any) => user.user._id != me);
    nameChat = name?.user?.name;
  }

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const image = fileReader.result;
        replyChat({
          id: id,
          data: {
            image: image,
          },
        });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const handleButtonClick = () => {
    setDropdownVisibility(!isDropdownVisible);
  };
  const [dropDownGroup, setDropDownGroup] = useState(false);
  const handleDownGroup = () => {
    setDropDownGroup(!dropDownGroup);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex-1 ">
            {/* Chat Header */}
            <header className="dark:bg-[#8ab4ed]  flex bg-[#c5daf8] p-4 text-gray-700">
              <h1 className="text-2xl font-semibold">{nameChat}</h1>

              <div className="relative ml-3">
                <SettingsIcon
                  id="menuButton"
                  className="focus:outline-none"
                  onClick={handleButtonClick}
                />

                <div
                  id="menuDropdown"
                  className={`absolute left-5 mt-2 w-60 bg-white border border-gray-300 rounded-md shadow-lg ${
                    isDropdownVisible ? "" : "hidden"
                  }`}
                >
                  <ul className="py-2 px-3">
                    <li className="flex items-center">
                      <IoMdExit size={20} />
                      <a
                        href="#"
                        className="relative block px-4 py-2 text-gray-800 hover:text-gray-400"
                      >
                        Rời cuộc trò chuyện.
                      </a>
                    </li>

                    <li
                      className="flex items-center"
                      onClick={() => handleDownGroup()}
                    >
                      <FiUsers size={20} />
                      <a className="relative block px-4 py-2 text-gray-800 hover:text-gray-400">
                        Tạo nhóm.
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </header>

            {/* Chat Messages */}
            <div className="h-4/5 overflow-y-auto p-4 pb-36">
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    msg.sender === me ? "justify-end" : "justify-start"
                  } cursor-pointer`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center mr-2 ${
                      msg.sender === me
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    <img
                      src={msg.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div
                    className={`flex max-w-96 rounded-lg p-3 gap-3 ${
                      msg.sender === me
                        ? "bg-indigo-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {msg.isActive ? (
                      <img
                        src={msg.content}
                        className="w-40 h-40 object-cover"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                        alt="Image"
                      />
                    ) : (
                      <p className={msg.sender === me ? "" : "text-gray-700"}>
                        {msg.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <footer className=" p-4 mt-9 dark:bg-black bg-white border-t border-gray-300 bottom-0">
              <div className="flex items-center ">
                <input
                  type="file"
                  name=""
                  id="image"
                  className="hidden"
                  onChange={imageHandler}
                  accept="image/png,image/jpg,image/jpeg,image/webp"
                />
                <label htmlFor="image">
                  <div className="mr-2">
                    <FcAddImage size={50} className="z-1" />
                  </div>
                </label>

                <input
                  type="text"
                  placeholder="Nhập nội dung..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 dark:text-white text-black"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Gửi
                </button>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
}

export default MainChat;
