import React, { FC } from "react";
import Image from "next/image";

type Props = {
  item: any;
  key: any;
};

const BlogCard: FC<Props> = ({ item }) => {
  return (
    <>
      <li>
        <a href={`/blog/${item?._id}`}>
          <div className="grid md:grid-cols-2 gap-5 md:gap-10 items-center">
            <Image
              src={item?.thumbnail?.url}
              alt=""
              width={800}
              height={600}
              className="w-full rounded-md object-cover object-center bg-white"
            />
            <div className="flex flex-col max-h-600 overflow-hidden">
              <span className="text-blue-400 uppercase tracking-wider text-sm font-medium">
                {" "}
                {item?.tags}{" "}
              </span>
              <h2 className="text-3xl font-semibold leading-snug tracking-tight mt-1 ">
                {" "}
                {item?.title}{" "}
              </h2>
              <div className="mt-3 overflow-hidden">
                <span className="text-gray-400 text-[18px] line-clamp-3">
                  {" "}
                  {item?.description}{" "}
                </span>
              </div>
              <div className="mt-3">
                <time className="text-gray-400 text-[14px]">
                  {new Date(item?.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </a>
      </li>
    </>
  );
};

export default BlogCard;
