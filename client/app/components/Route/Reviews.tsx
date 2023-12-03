import Image from "next/image";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/style";
import ReviewCard from "../Review/ReviewCard";
import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';

type Props = {
};

const Reviews = (props: Props) => {
  const { data, refetch } = useGetUserAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.course || []);
  }, [data]);
  useEffect(() => {
    // Filter reviews with a rating of 4 stars or above
    if (courses.length > 0) {
      const filtered = courses
        .map(course => course.reviews || [])
        .flat()
        .filter(review => review.rating >= 4);

        setFilteredReviews(filtered.slice(0, 4));
      }
  }, [courses]);
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
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Học Sinh Của Chúng Tôi{" "}
            <span className="text-gradient">Là Sức Mạnh Của Chúng Tôi </span>
            <br />
            <br />
            Xem Họ Nói Gì Nào
          </h3>
          <br />
          <p className={`${styles.label} ml-4`}>
            Hiểu quả của khóa học, lợi ích khi tham gia, những tiến bộ khi tham
            gia, cơ hội việc làm.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-l gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px] mt-9">
        {filteredReviews &&
          filteredReviews.map((review, index) => (
            <ReviewCard item={review} key={index} />))}
      </div>
    </div>
  );
};

export default Reviews;
