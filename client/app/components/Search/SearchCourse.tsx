import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

type Props = {};

const SearchCourse = (props: Props) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/courses?title=${search}`);
  };

  return (
    <>
      <div className="w-max-[100%] h-[50px] bg-transparent relative">
        <input
          type="search"
          placeholder="Tìm khóa học ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xl bg-transparent border dark:border-none dark:bg-[#fafafa] dark:placeholder::text-[#ffffdd] rounded-[5px] p-4 w-full h-full outline-none text-black dark:text-white"
        />
        <div
          className="absolute flex items-center justify-center w-[70px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
          onClick={handleSearch}
        >
          <BiSearch className="text-white" size={30} />
        </div>
      </div>
    </>
  );
};

export default SearchCourse;
