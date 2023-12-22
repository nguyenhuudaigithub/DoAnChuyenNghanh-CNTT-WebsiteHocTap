import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import React, { useCallback, useEffect, useState } from 'react';
import CourseCardHistory from './CourseCardHistory';
import { useSelector } from 'react-redux';
import { useGetAllOrdersInfoQuery } from '@/redux/features/order/orederApi';

type Props = {};

const History = (props: Props) => {
  const { user: userLog } = useSelector((state: any) => state.auth);
  const { data: coursesData } = useGetAllCoursesQuery({});
  const { isLoading, data } = useGetAllOrdersInfoQuery({});
  const [orderData, setOrderData] = useState<any>([]);

  const handleShowOrder = () => {
    const listOrder = data?.orders?.filter(
      (item: any) => item?.userId === userLog?._id
    );
    const temp = listOrder?.map((item: any) => {
      const course = coursesData?.courses?.find(
        (course: any) => course?._id === item?.courseId
      );

      return {
        ...item,
        // image: course?.thumbnail?.url,
        // name: course?.name,
        // description: course?.description,
        // price: course?.price,
        // ratings: course?.ratings,
        course: course,
      };
    });

    setOrderData(temp);
  };

  useEffect(() => {
    if (data) {
      handleShowOrder();
    }
  }, [coursesData, isLoading]);

  return (
    <div className='flex flex-wrap flex-col min-h-full overflow-y-auto'>
      {orderData &&
        orderData.map((course: any) => (
          <CourseCardHistory key={course?._id} course={course?.course} />
        ))}
    </div>
  );
};

export default History;
