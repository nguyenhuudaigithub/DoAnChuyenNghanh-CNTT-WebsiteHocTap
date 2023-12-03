import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import Loader from '../../Loader/Loader';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { format } from 'timeago.js';
import { AiOutlineMail } from 'react-icons/ai';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { useGetAllOrdersInfoQuery } from '@/redux/features/order/orederApi';

type Props = {
  isDashboard?: boolean;
};

function AllInvoices({ isDashboard }: Props) {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersInfoQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  // console.log('orderData', orderData);
  // console.log('data', data);
  // console.log('usersData', usersData);
  // console.log('coursesData', coursesData);
  // console.log(
  //   coursesData?.courses?.find((course: any) => course?._id === item?.courseId)
  // );

  useEffect(() => {
    if (data) {
      const temp = data?.orders?.map((item: any) => {
        const user = usersData?.users?.find(
          (user: any) => user?._id === item?.userId
        );

        const course = coursesData?.courses?.find(
          (course: any) => course?._id === item?.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: 'id', headerName: 'Mã giao dịch', flex: 0.3 },
    {
      field: 'userName',
      headerName: 'Họ và tên',
      flex: isDashboard ? 0.6 : 0.5,
    },
    ...(isDashboard
      ? []
      : [
          { field: 'userEmail', headerName: 'Email', flex: 1 },
          { field: 'title', headerName: 'Tên khóa học', flex: 1 },
        ]),
    { field: 'price', headerName: 'Giá', flex: 0.5 },
    ...(isDashboard
      ? [{ field: 'created_at', headerName: 'Ngày giao dịch', flex: 0.5 }]
      : [
          {
            field: ' ',
            headerName: 'Email',
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className='dark:!text-white !text-black'
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item?._id,
        userName: item?.userName,
        userEmail: item?.userEmail,
        title: item?.title,
        price: item?.price,
        created_at: format(item?.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? 'mt-[120px]' : 'mt-[0px]'}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? '0' : '40px'}>
          <Box
            m={isDashboard ? '0' : '40px 0 0 0'}
            height={isDashboard ? '35vh' : '90vh'}
            overflow={'hidden'}
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none',
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-sortIcon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },

              '6 .MuiDataGrid-row': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom:
                  theme === 'dark'
                    ? '1px solid #ffffff30!important'
                    : '1px solid #ccc!important',
              },
              '& .MuiTablePagination-root': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none !important',
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000',
              },

              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                borderBottom: 'none',
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-virtualScroller': {
                color: theme === 'dark' ? '#fff' : '#000',
                backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0',
              },
              '& .MuiDataGrid-footerContainer': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderTop: 'none',
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
              },
              '& .MuiCheckbox-root': {
                color:
                  theme === 'dark' ? `#b7ebde !important` : `#000 !important`,
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
}

export default AllInvoices;
