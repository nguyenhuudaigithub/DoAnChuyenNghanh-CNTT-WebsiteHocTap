import {
  useGetSingleChatQuery,
  useOutGroupMutation,
  useRenameMutation,
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
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AvatarGroup, Box, Button, Modal, TextField } from "@mui/material";
import { FaImage } from "react-icons/fa";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const me = data?.user._id;
  const user = data?.user;
  const router = useRouter();

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
  const [replyChat, { isSuccess, error, data: dataReply }] =
    useReplyChatMutation();

  const [rename, { isSuccess: isSuccessNG }] = useRenameMutation();

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
    if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [isSuccess, error, dataReply]);

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [questionEmail, setQuestionEmail] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const [active, setActive] = useState(false);
  const [avatarGroup, setAvatarGroup] = useState(false);
  const onSubmit = async (e: any) => {
    if (active || avatarGroup) {
      if (active) {
        toast.success(questionEmail);
        rename({
          id: id,
          data: {
            nameGroup: questionEmail,
          },
        });
      } else {
        // image
      }
    } else {
      replyChat({
        id: id,
        data: {
          email: questionEmail,
        },
      });
    }
  };

  const [outGroup, { isSuccess: isSuccessOutGroup }] = useOutGroupMutation();

  useEffect(() => {
    if (isSuccessOutGroup) {
      router.push("/chat");
      toast.success("Rời nhóm thành công!");
    }
  }, [isSuccessOutGroup]);

  const handleOutGroup = () => {
    outGroup({
      id: id,
    });
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
                    <li className="flex items-center" onClick={handleOutGroup}>
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
                      onClick={() => {
                        handleOpen();
                        setActive(false);
                        setAvatarGroup(false);
                      }}
                    >
                      <FiUsers size={20} />
                      <a className="relative block px-4 py-2 text-gray-800 hover:text-gray-400">
                        {dataMessage?.group?.length > 2
                          ? `Thêm thành viên.`
                          : "Tạo nhóm."}
                      </a>
                    </li>
                    {dataMessage?.group?.length > 2 && (
                      <>
                        <li
                          className="flex items-center"
                          onClick={() => {
                            handleOpen();
                            setActive(false);
                            setAvatarGroup(true);
                          }}
                        >
                          <FaImage size={20} />
                          <a
                            href="#"
                            className="relative block px-4 py-2 text-gray-800 hover:text-gray-400"
                          >
                            Đổi ảnh đại diện nhóm.
                          </a>
                        </li>
                        <li
                          className="flex items-center"
                          onClick={() => {
                            handleOpen();
                            setActive(true);
                            setAvatarGroup(false);
                          }}
                        >
                          <MdDriveFileRenameOutline size={20} />
                          <a
                            href="#"
                            className="relative block px-4 py-2 text-gray-800 hover:text-gray-400"
                          >
                            Đổi tên nhóm.
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </header>

            {
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={style}
                  className="dark:bg-slate-600 bg-slate-100 dark:text-white text-black"
                >
                  <>
                    <form onSubmit={onSubmit}>
                      {active || avatarGroup ? (
                        <>
                          {active && avatarGroup == false ? (
                            <>
                              <h1>Đổi Tên Nhóm </h1>
                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "auto auto",
                                  gap: "20px",
                                  marginTop: 3,
                                }}
                              >
                                <TextField
                                  type="text"
                                  label="Nhập tên nhóm"
                                  variant="outlined"
                                  focused
                                  className="dark:text-white text-black"
                                  onChange={(e: any) =>
                                    setQuestionEmail(e.target.value)
                                  }
                                  required
                                />
                              </Box>
                            </>
                          ) : (
                            <>
                              <h1>Đổi Ảnh Đại Diện Nhóm </h1>
                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "auto auto",
                                  gap: "20px",
                                  marginTop: 3,
                                }}
                              ></Box>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <h1>Thêm người dùng</h1>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "auto auto",
                              gap: "20px",
                              marginTop: 3,
                            }}
                          >
                            <TextField
                              type="email"
                              label="Email người dùng"
                              variant="outlined"
                              focused
                              className="dark:text-white text-black"
                              onChange={(e: any) =>
                                setQuestionEmail(e.target.value)
                              }
                              required
                            />
                          </Box>
                        </>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          marginTop: 3,
                        }}
                      >
                        <Button
                          sx={{
                            display: "flex",
                            width: "200px",
                            marginRight: 3,
                            backgroundColor: "orange",
                            color: "white",
                          }}
                          onClick={() => handleClose()}
                        >
                          Hủy Bỏ
                        </Button>
                        <Button
                          type="submit"
                          sx={{
                            display: "flex",
                            width: "200px",
                            backgroundColor: "#009FBD",
                            color: "white",
                          }}
                        >
                          Lưu
                        </Button>
                      </Box>
                    </form>
                  </>
                </Box>
              </Modal>
            }

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
                        : "dark:bg-gray-300 bg-[#d23939]"
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
                        : "dark:bg-white bg-[#8be3d4]"
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
