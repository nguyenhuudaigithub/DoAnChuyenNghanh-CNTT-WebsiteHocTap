import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [comparePercentenge, setcomparePercentenge] = useState();
  const [ordersComparePercentenge, setOrdersComparePercentenge] =
    useState<any>();
  const [userComparePercentenge, setUserComparePercentenge] = useState<any>();
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);
        if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths === 2) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;
          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;
          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;
          setUserComparePercentenge({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });
          setOrdersComparePercentenge({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);
  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5
                  className="pt-2 font-Poppins dark:text-[#fff] text-black
                text-[20px]"
                >
                  {ordersComparePercentenge?.currentMonth}
                </h5>
                <h5
                  className="py-2 font-Poppins dark:text-[#45CBA0] text-black
                text-[20px] font-[400]"
                >
                  Doanh thu đạt được
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={ordersComparePercentenge?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {ordersComparePercentenge?.percentChange > 0
                    ? "+" + ordersComparePercentenge?.percentChange.toFixed(2)
                    : "-" + ordersComparePercentenge?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {userComparePercentenge?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Người dùng
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={userComparePercentenge?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {userComparePercentenge?.percentChange > 0
                    ? "+" + userComparePercentenge?.percentChange.toFixed(2)
                    : "-" +
                      userComparePercentenge?.percentChange.toFixed(2)}{" "}
                  %
                </h5>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>

      <div className="grid grid-cols-[65%,35%l mt-[-20px] ml-4">
        <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
          <OrdersAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
            Giao dịch gần đây
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
