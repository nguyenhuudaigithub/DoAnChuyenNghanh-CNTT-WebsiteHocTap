import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useGetUserAllBlogsQuery } from "@/redux/features/blog/blogApi";
import Loader from "../Loader/Loader";

type Props = {};

const ListLayout = (props: Props) => {
  const { data, isLoading } = useGetUserAllBlogsQuery(undefined, {});
  const [blogs, setBlogs] = useState<any[]>([]);
  useEffect(() => {
    setBlogs(data?.blog);
  }, [data]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-screen-xl mx-auto px-5">
            <div className="mt-16 text-center">
              <h1 className="text-4xl lg:text-5xl dark:text-white text-black font-bold lg:tracking-tight">
                Bài Viết
              </h1>
              <p className="text-lg mt-4 text-slate-600">
                Chúng tôi cung cấp cho bạn những bài viết về công nghệ, kỹ
                thuật, đời sống.
              </p>
            </div>
            <main className="mt-16">
              <ul className="grid gap-16 max-w-4xl mx-auto">
                {blogs &&
                  blogs.map((item: any, index: number) => (
                    <BlogCard item={item} key={index} />
                  ))}
              </ul>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default ListLayout;
