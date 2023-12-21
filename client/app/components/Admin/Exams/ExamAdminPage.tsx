import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React, { useEffect, useState } from 'react';
import PageTitle from './PageTitle';
import { useRouter } from 'next/navigation';
import { useGetAllExamsQuery } from '@/redux/features/exams/examsApi';

const Exams = () => {
  const { data: exams, refetch } = useGetAllExamsQuery({});
  const router = useRouter();

  // const [exams, setExams] = useState<any>();

  // const getAllExams = async () => {
  //   setExams(data.data);
  // };

  const deleteExam = async (examId: string) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/delete-exam-by-id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId,
        }),
      }
    );
    refetch();
    // getAllExams();
  };

  // useEffect(() => {
  //   getAllExams();
  // }, []);

  // console.log(exams);

  const MuiTable = () => {
    return (
      <div className='min-h-[79vh] px-4'>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Tên Bài</TableCell>
                <TableCell align='center'>Thời lượng</TableCell>
                <TableCell align='center'>Thể loại</TableCell>
                <TableCell align='center'>Tổng điểm</TableCell>
                <TableCell align='center'>Điểm đạt</TableCell>
                <TableCell align='center'>Chỉnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams &&
                exams?.data?.map((row: any) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align='center'>{row.name}</TableCell>
                    <TableCell align='center'>{row.duration}</TableCell>
                    <TableCell align='center'>{row.category}</TableCell>
                    <TableCell align='center'>{row.totalMarks}</TableCell>
                    <TableCell align='center'>{row.passingMarks}</TableCell>
                    <TableCell align='center'>
                      <div className='flex gap-3 justify-center  items-center'>
                        <IconButton
                          onClick={() =>
                            router.push(`/admin/exams/edit/${row._id}`, {
                              scroll: false,
                            })
                          }
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteExam(row._id)}>
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  return (
    <>
      <div className='flex justify-between items-center mt-[6rem]'>
        <PageTitle title={'Quản lý Bài Test'} />
        <Button
          className='outline-purple-500'
          onClick={() =>
            router.push('/admin/exams/add', {
              scroll: false,
            })
          }
        >
          Thêm Bài Test
        </Button>
      </div>
      <Divider
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      />
      <MuiTable />
    </>
  );
};

export default Exams;
