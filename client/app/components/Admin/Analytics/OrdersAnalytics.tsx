import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loader from '../../Loader/Loader';
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { styles } from '../../styles/style';

type Props = {
  isDashboard?: boolean;
};
// const data = [
//   {
//     name: 'Page A',
//     Count: 4000,
//   },
//   {
//     name: 'Page B',
//     Count: 3000,
//   },
//   {
//     name: 'Page C',
//     Count: 5000,
//   },
//   {
//     name: 'Page D',
//     Count: 1000,
//   },
//   {
//     name: 'Page E',
//     Count: 4000,
//   },
//   {
//     name: 'Page F',
//     Count: 800,
//   },
//   {
//     name: 'Page G',
//     Count: 200,
//   },
// ];

function OrdersAnalytics({ isDashboard }: Props) {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  useEffect(() => {}, []);

  const analyticsData: any = [];

  data &&
    data?.orders?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item?.name, Count: item?.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? 'h-[30vh] ' : 'h-[82vh]'}>
          <div className={isDashboard ? 'mt-[0px] mb-2' : 'mt-[50px]'}>
            <h1
              className={`${styles.title} ${
                isDashboard && '!text-[20px]'
              } px-5 !text-start`}
            >
              Phân Tích Hóa Đơn
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Dữ liệu phân tích gần nhất 12 tháng{' '}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? 'h-[90%]' : 'h-full'
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? '100%' : '90%'}
              height={isDashboard ? '100%' : '70%'}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />

                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type='monotone' dataKey='Count' stroke='#82ca9d' />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersAnalytics;
