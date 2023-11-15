import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Footer from "../Route/Footer";
import CourseDetails from "./CourseDetails";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import Header from "../Header";
type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  console.log(id);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const {data, isLoading} = useGetCourseDetailsQuery(id);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + " - Elearning"}
            description={"Elearning is a programming"}
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <CourseDetails data={data.course} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
