import React, { FC } from "react";
import Link from "next/link";

type Props = {
  item: any;
  isProfile?: boolean;
  id: string;
  isAdmin: boolean;
};

const ChatCard: FC<Props> = ({ item, isProfile, id, isAdmin }) => {
  let nameChat = item?.nameGroup;
  let avatar =
    "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png";
  if (item.group?.length == 2) {
    const foundUser = item.group.find((user: any) => user.user._id != id);

    if (foundUser?.user?.avatar?.url) {
      avatar = foundUser.user.avatar.url;
    }
    nameChat = foundUser?.user?.name;
  } else if (item.chatAdmin && isAdmin == false) {
    avatar = "https://img.icons8.com/?size=256&id=7hmHYH5hPLfG&format=png";
  } else {
    avatar = item?.group[0]?.user?.avatar?.url;
    nameChat = item?.group[0]?.user?.name;
  }

  const chat = item.message[item.message.length - 1];

  let chatNew = chat?.message;

  if (chat?.image) {
    chatNew = "Hình ảnh.";
  }

  let link = `/chat/${item?._id}`;

  if (isAdmin) {
    link = `/admin/chat/${item?._id}`;
  }
  return (
    <Link href={!isProfile ? `${link}` : `${link}`}>
      <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 text-black dark:text-white p-2 rounded-md">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
          <img
            src={avatar}
            width={50}
            height={50}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-gray-500 ">{nameChat}</h2>
          <p className="text-gray-600">{chatNew}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
