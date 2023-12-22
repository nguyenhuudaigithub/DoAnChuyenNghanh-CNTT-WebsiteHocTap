import { useCreateChatMutation } from "@/redux/features/chat/chatApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

const AddFriend = (props: Props) => {
  const [createChat, { isSuccess, error, data }] = useCreateChatMutation();
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Tạo nhóm chat mới thành công!");
      router.push("/chat/" + data?.chat?._id);
    }

    if (error) {
      const errorData = error as any;
      console.log(errorData);
      if (errorData?.status == 400) {
        toast.error(errorData?.data?.message);
      } else if (errorData?.status == 401) {
        toast.success(errorData?.data?.message);
        router.push("/chat/" + errorData?.data?.groupId[0]?._id);
      }
    }
  }, [isSuccess, error, data]);

  const handleSearch = () => {
    if (search && (search.toLowerCase() === "admin" || isValidEmail(search))) {
      if (isValidEmail(search)) {
        createChat({
          email: search,
        });
      } else {
        createChat({
          chatAdmin: true,
        });
      }
    } else {
      alert('Vui lòng nhập email hoặc "Admin" để tạo nhóm trò chuyện.');
    }
  };

  const isValidEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="flex-1 ">
        <div className="bg-[#e1e1ed] flex  dark:bg-[#0e121d] ">
          <div className="container h-screen flex ">
            <div className="relative mt-5 ml-[20%]">
              <div className="absolute top-4 left-3">
                <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
              </div>
              <input
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                type="text"
                value={search}
                className="dark:text-white text-black h-14 w-[300%] pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                placeholder="Nhập email người dùng hoặc admin..."
              />
              <div className="absolute top-2 right-[-195%]">
                <button
                  onClick={handleSearch}
                  className="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600"
                >
                  Trò Chuyện
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="h-4/5 overflow-y-auto p-4 pb-36 mt-[-60%] dark:text-white text-black">
          <h1>lk</h1>
        </div> */}
      </div>
    </>
  );
};

export default AddFriend;
