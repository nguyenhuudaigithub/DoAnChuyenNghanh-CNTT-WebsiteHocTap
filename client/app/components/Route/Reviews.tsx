import Image from "next/image";
import React from "react";
import { styles } from "../styles/style";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Bùi Văn Sơn",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge university",
    comment:
      "I had the pleasure of exploring Elearning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed",
  },
  {
    name: "Nguyễn Quốc Nhật",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "I recently purchased a course {roe Decoder-y, and I must say. it exceeded my expectations! The website offers a wide range of tech-related courses.",
  },
];

const Reviews = (props: Props) => {
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
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
