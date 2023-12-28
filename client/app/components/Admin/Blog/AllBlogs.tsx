// Hiện thị toàn bộ khóa học
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from 'react-icons/fi';
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from '@/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import { styles } from '../../styles/style';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {};

const AllBlogs = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'title', headerName: 'Tên Khóa Học', flex: 1 },
    { field: 'ratings', headerName: 'Xếp Hạng', flex: 0.5 },
    { field: 'purchased', headerName: 'Mua', flex: 0.5 },
    { field: 'created_at', headerName: 'Ngày Tạo', flex: 0.5 },
    {
      field: '  ',
      headerName: 'Chỉnh Sửa',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className='dark:text-white text-black' size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: '',
      headerName: 'Xóa',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setBlogId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className='dark:text-white text-black'
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  // Lấy ra thông tin của tất cả khóa học

  return (
    <></>
    // <div className='m-auto h-min-screen mt-[2.15rem] p-4'>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    //     <Box m='20px'>
    //       <Box
    //         m='40px 0 0 0'
    //         height='82.7vh'
    //         sx={{
    //           '& .MuiDataGrid-root': {
    //             border: 'none',
    //             outline: 'none',
    //           },
    //           '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
    //             color: theme === 'dark' ? '#fff' : '#000',
    //           },
    //           '& .MuiDataGrid-sortIcon': {
    //             color: theme === 'dark' ? '#fff' : '#000',
    //           },
    //           '& .MuiDataGrid-row': {
    //             color: theme === 'dark' ? '#fff' : '#000',
    //             borderBottom:
    //               theme === 'dark'
    //                 ? '1px solid #ffffff30!important'
    //                 : '1px solid #ccc!important',
    //           },
    //           '& .MuiTablePagination-root': {
    //             color: theme === 'dark' ? '#fff' : '#000',
    //           },
    //           '& .MuiDataGrid-cell': {
    //             borderBottom: 'none',
    //             '& .name-column--cell': {
    //               color: theme === 'dark' ? '#fff' : '#000',
    //             },
    //           },
    //           '& .MuiDataGrid-columnHeaders': {
    //             backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
    //             borderBottom: 'none',
    //             color: theme === 'dark' ? '#fff' : '#000',
    //           },
    //           '& .MuiDataGrid-virtualScroller': {
    //             backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0',
    //           },
    //           '& .MuiDataGrid-footerContainer': {
    //             color: theme === 'dark' ? '#fff' : '#000',
    //             borderTop: 'none',
    //             backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
    //           },
    //           '& .MuiCheckbox-root': {
    //             color:
    //               theme === 'dark' ? '#b7ebde !important' : '#000 !important',
    //           },
    //           '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
    //             color: '#fff !important',
    //           },
    //         }}
    //       >
    //         <DataGrid checkboxSelection rows={rows} columns={columns} />
    //       </Box>
    //       {open && (
    //         <Modal
    //           open={open}
    //           onClose={() => setOpen(!open)}
    //           aria-labelledby='modal-modal-title'
    //           aria-describedby='modal-modal-description'
    //         >
    //           <Box className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none'>
    //             <h1 className={`${styles.title}`}>
    //               Bạn có muốn xóa khóa học không ?
    //             </h1>
    //             <div className='flex w-full items-center justify-between mb-6 mt-4'>
    //               <div
    //                 className={`${styles.button} w-[120px] h-[30px] bg-[#57c7a3]`}
    //                 onClick={() => setOpen(!open)}
    //               >
    //                 Không
    //               </div>
    //               <div
    //                 className={`${styles.button} w-[120px] h-[30px] bg-[#d63f3f]`}
    //                 onClick={handleDelete}
    //               >
    //                 Xóa
    //               </div>
    //             </div>
    //           </Box>
    //         </Modal>
    //       )}
    //     </Box>
    //   )}
    // </div>
  );
};

export default AllBlogs;