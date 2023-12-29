import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import React, { FC } from "react";
import Loader from "../Loader/Loader";

type Props = {
  id: any;
};

const BlogDetail: FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetSingleBlogQuery(id);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-screen-xl mx-auto px-5 dark:text-white text-black">
            <div className="mx-auto max-w-3xl mt-14">
              <span className="text-blue-400 uppercase tracking-wider text-sm font-medium">
                {data.blog.tags}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight">
                {data.blog.title}
              </h1>
              <div className="flex gap-2 mt-3 items-center flex-wrap md:flex-nowrap">
                <time className="text-gray-400 text-[14px]">
                  {new Date(data.blog?.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </time>
                <span className="text-gray-400 hidden md:block">•</span>
                <div className="w-full md:w-auto flex flex-wrap gap-3">
                  <span className="text-sm text-gray-500">#webdev</span>
                  <span className="text-sm text-gray-500">#tailwindcss</span>
                  <span className="text-sm text-gray-500">#frontend</span>
                </div>
              </div>
              <div className="mx-auto prose prose-lg mt-6 max-w-3xl">
                <div
                  dangerouslySetInnerHTML={{ __html: data.blog?.detail }}
                  style={{ overflowY: "auto" }}
                />
              </div>
            </div>
            <div className="text-center mt-8">
              <input
                type="button"
                onClick={handleOpen}
                value="Xem Trước"
                className="w-full m-3 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
              />
              {
                
              }
            </div>
            <div className="text-center mt-8">
              <a
                href="/blog"
                className="dark:bg-[#7e91a3c3] bg-[#f7f7f79c] px-5 py-3 rounded-md hover:bg-[#b0f5b391] transition"
              >
                ← Quay Lại
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogDetail;
