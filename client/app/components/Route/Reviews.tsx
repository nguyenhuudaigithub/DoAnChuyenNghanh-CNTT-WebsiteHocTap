import Image from "next/image";
import { styles } from "../styles/style";
import ReviewCard from "../Review/ReviewCard";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";

type Props = {};

const Reviews = (props: Props) => {
  const { data } = useGetUserAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.course);
  }, [data]);

  const reviews = courses?.flatMap((course) =>
    (course?.reviews && [...course.reviews].reverse()).map((item: any) => ({
      name: item?.user.name,
      avatar: item.user?.avatar
        ? item.user.avatar.url
        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
      profession: course.name,
      comment: item.comment,
      rating: item.rating,
    }))
  );
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assests/business.jpg")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full ml-2 text-4xl sm:text-5xl lg:text-5xl ">
          <h3 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-600">
            Học Sinh Của Chúng Tôi
            <br />
            <span className="text-gradient text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
              Là Sức Mạnh Của Chúng Tôi{" "}
            </span>
            <br />
            <br />
            <span className="dark:text-purple-400 text-black">
              Xem Họ Nói Gì Nào !{" "}
            </span>
          </h3>
          <br />
          <p className={`${styles.label} ml-4`}>
            Hiểu quả của khóa học, lợi ích khi tham gia, những tiến bộ
            <br />
            khi tham gia, cơ hội việc làm.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-l gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px] mt-9">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
