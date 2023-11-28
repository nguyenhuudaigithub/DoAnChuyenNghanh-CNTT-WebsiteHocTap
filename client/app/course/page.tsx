"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../components/styles/style";
import CourseCard from "../components/Course/CourseCard";
import TfIdfSearch from "../utils/TfIdfSearch";
import Footer from "../components/Route/Footer";
import { log } from "console";

type Props = {};

function page({}: Props) {

  const { data, isLoading } = useGetUserAllCoursesQuery({});

  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(()=>{
    setCourses(data?.course)
    
  },[data])
  
  useEffect(() => {
    if (category === "All") {
      setCourses(data?.course);
    }
    if (category !== "All") {
      const idOfCategory = categoriesData?.layout?.categories?.find(
        (c: any) => c.title === category
      );
      setCourses(
        data?.course?.filter(
          (item: any) => item?.categories === idOfCategory._id
        )
      );
    }
  }, [ category]);

  const categories = categoriesData?.layout?.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <Heading
            title="NETSKILLD"
            description="NETSKILLD là một nền tảng để học sinh học hỏi và nhận được sự giúp đỡ từ giáo viên"
            keywords="Học Lập Trình,MERN,Redux,Học Máy"
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[82vh]">
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[36px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                Tất cả
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item?.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[38px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item?.title)}
                    >
                      {item?.title}
                    </div>
                  </div>
                ))}
            </div>
            {/* {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "Không tìm thấy khóa học!"
                  : "Không có khóa học nào được tìm thấy trong danh mục này. Vui lòng thử một cái khác!"}
              </p>
            )} */}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-3">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default page;