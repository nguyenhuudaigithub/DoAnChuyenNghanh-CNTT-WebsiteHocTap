import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '../../styles/style';

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  // const analyticsData = [
  //   { name: 'Jun 2023', uv: 3 },
  //   { name: 'July 2023', uv: 2 },
  //   { name: 'August 2023', uv: 5 },
  //   { name: 'Sept 2023', uv: 7 },
  //   { name: 'October 2023', uv: 2 },
  //   { name: 'Nov 2023', uv: 5 },
  //   { name: 'December 2023', uv: 7 },
  // ];

  const analyticsData: any = [];

  // console.log(data);

  data &&
    data?.courses?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item?.month, uv: item?.count });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='h-[82vh]'>
          <div className='mt-[50px]'>
            <h1 className={`${styles.title} px-5 !text-start`}>
              Phân Tích Những Khóa Học
            </h1>
            <p className={`${styles.label} px-5`}>
              Dữ liệu phân tích gần nhất 12 tháng{' '}
            </p>
          </div>

          <div className='w-full h-[90%] flex items-center justify-center'>
            <ResponsiveContainer width='90%' height='70%'>
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey='name'>
                  <Label offset={0} position='insideBottom' />
                </XAxis>
                <YAxis domain={[minValue, 'auto']} />
                <Bar dataKey='uv' fill='#3faf82'>
                  <LabelList dataKey='uv' position='top' />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
