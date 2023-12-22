import React, { useEffect, useRef, useState } from 'react';
import PageTitle from './PageTitle';

import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import WidgetWrapper from '@/app/exams/[id]/components/WidgetWrapper';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import TabsNotification from './TabsNotification';
import { useRouter } from 'next/navigation';
import { useGetAllExamsQuery } from '@/redux/features/exams/examsApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddEditExam = () => {
  const { data: exams, refetch: refetchExams } = useGetAllExamsQuery({});
  let {
    data: categories,
    isLoading,
    refetch,
  } = useGetHeroDataQuery('Categories', {
    refetchOnMountOrArgChange: true,
  });

  const router = useRouter();

  const [examName, setExamName] = useState('');
  const [examDuration, setExamDuration] = useState(0);
  const [category, setCategory] = useState('');
  const [totalMarks, setTotalMarks] = useState(0);
  const [passingMarks, setPassingMarks] = useState(0);

  // const questionName = useRef('');
  // const correctOption = useRef('');
  // const A = useRef('');
  // const B = useRef('');
  // const C = useRef('');
  // const D = useRef('');
  const [questionName, setQuestionName] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [A, setA] = useState('');
  const [B, setB] = useState('');
  const [C, setC] = useState('');
  const [D, setD] = useState('');

  const [selectedQuestion, setSelectedQuestion] = useState<any>();

  const [examData, setExamData] = useState<any>();

  const params = useParams();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedQuestion(undefined);
  };
  const [activeTab, setActiveTab] = useState(0);

  const getNameCategory = (id: string) => {
    const getCategory = categories?.layout?.categories.filter(
      (category: any) => category._id == id
    );

    return getCategory ? getCategory[0]?.title : getCategory;
  };

  const onSubmitQuestion = async (e: any) => {
    e.preventDefault();
    if (selectedQuestion) {
      const response = await fetch(
        `http://localhost:8000/api/v1/edit-question-to-exam`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: questionName || selectedQuestion?.name,
            correctOption: correctOption || selectedQuestion?.correctOption,
            options: {
              A: A || selectedQuestion?.options?.A,
              B: B || selectedQuestion?.options?.B,
              C: C || selectedQuestion?.options?.C,
              D: D || selectedQuestion?.options?.D,
            },
            examId: params?.id,
            questionId: selectedQuestion?._id,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        refetchExams();
        router.push('/admin/exams/edit', {
          scroll: false,
        });
        toast(`${data.message}`);

        handleClose();

        return;
      } else {
        toast(`${data.message}`);
        handleClose();

        return;
      }
    } else {
      const response = await fetch(
        `http://localhost:8000/api/v1/add-question-to-exam`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: questionName,
            correctOption: correctOption,
            options: {
              A: A,
              B: B,
              C: C,
              D: D,
            },
            exam: params?.id,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        refetchExams();
        router.push('/admin/exams', {
          scroll: false,
        });
        toast(`${data.message}`);

        handleClose();

        return;
      } else {
        toast(`${data.message}`);

        handleClose();

        return;
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (params?.id) {
      const idCategory = categories?.layout?.categories?.filter(
        (categoryL: any) => categoryL?.title == category
      );

      const response = await fetch(
        `http://localhost:8000/api/v1/edit-exam-by-id`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            examId: params?.id,
            name: examName,
            duration: examDuration,
            category: idCategory[0]?._id || category,
            totalMarks: totalMarks,
            passingMarks: passingMarks,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        refetchExams();
        router.push('/admin/exams', {
          scroll: false,
        });
        toast(`${data.message}`);

        return;
      } else {
        toast(`${data.message}`);

        return;
      }
    } else {
      const idCategory = categories?.layout?.categories?.filter(
        (categoryL: any) => categoryL?.title == category
      );

      const response = await fetch(`http://localhost:8000/api/v1/add-exam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: examName,
          duration: examDuration,
          category: idCategory[0]?._id || category,
          totalMarks: totalMarks,
          passingMarks: passingMarks,
        }),
      });
      const data = await response.json();
      if (data.success) {
        refetchExams();
        router.push('/admin/exams', {
          scroll: false,
        });
        toast(`${data.message}`);

        return;
      } else {
        toast(`${data.message}`);

        return;
      }
    }
  };

  const getExamData = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/get-exam-by-id`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: params?.id,
        }),
      }
    );
    const data = await response.json();
    refetchExams();
    setExamData(data?.data);
    setExamName(data?.data?.name);
    setExamDuration(data?.data?.duration);
    setCategory(data?.data?.category);
    setTotalMarks(data?.data?.totalMarks);
    setPassingMarks(data?.data?.passingMarks);
  };

  const deleteQuestion = async (questionId: string) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/delete-question-to-exam`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId,
          examId: params?.id,
        }),
      }
    );
    getExamData();
  };

  useEffect(() => {
    if (params?.id) {
      getExamData();
    }
  }, []);

  const MuiTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Tên câu hỏi</TableCell>
              <TableCell align='center'>Các lựa chọn</TableCell>
              <TableCell align='center'>Câu đúng</TableCell>
              <TableCell align='center'>Tinh chỉnh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examData?.questions?.map((row: any) => (
              <TableRow
                key={row?._id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell align='center'>{row?.name}</TableCell>
                <TableCell align='center'>
                  {Object.keys(row?.options).map((key) => {
                    return (
                      <div>
                        {key} : {row.options[key]}
                      </div>
                    );
                  })}
                </TableCell>
                <TableCell align='center'>
                  {row.correctOption} : {row.options[`${row.correctOption}`]}
                </TableCell>
                <TableCell align='center'>
                  <div className='flex gap-3 justify-center'>
                    <IconButton
                      onClick={() => {
                        setSelectedQuestion(row);
                        handleOpen();
                      }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteQuestion(row._id)}>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const tabs = [
    {
      name: 'Chi Tiết Bài Test',
      component: (
        <>
          {(examData || !params?.id) && (
            <>
              <form
                onSubmit={handleSubmit}
                className='dark:!text-white min-h-[77vh]'
              >
                <div
                  className='grid gap-[20px] mt-3 dark:!text-white'
                  style={{
                    gridTemplateColumns: 'auto auto',
                  }}
                >
                  <TextField
                    sx={{
                      input: {
                        background: '#e9e9e9',
                      },
                    }}
                    focused
                    type='text'
                    label='Tên Bài Test'
                    defaultValue={examData?.name}
                    variant='outlined'
                    onChange={(e: any) => setExamName(e.target.value)}
                  />
                  <TextField
                    sx={{
                      input: {
                        background: '#e9e9e9',
                      },
                    }}
                    focused
                    label='Thời lượng bài Test'
                    defaultValue={examData?.duration}
                    type='number'
                    variant='outlined'
                    onChange={(e: any) => setExamDuration(e.target.value)}
                  />
                  <div className='dark:!text-white w-full bg-[#e9e9e9]'>
                    <TextField
                      sx={{
                        input: {
                          background: '#e9e9e9',
                        },
                      }}
                      focused
                      label={getNameCategory(examData?.category)}
                      select
                      onChange={(e: any) => setCategory(e.target.value)}
                      fullWidth
                    >
                      <MenuItem disabled value=''>
                        Chọn thể loại
                      </MenuItem>
                      {categories &&
                        categories?.layout?.categories.map((category: any) => (
                          <MenuItem key={category?._id} value={category?.title}>
                            {category?.title}
                          </MenuItem>
                        ))}
                    </TextField>
                  </div>

                  <TextField
                    sx={{
                      input: {
                        background: '#e9e9e9',
                      },
                    }}
                    type='number'
                    defaultValue={examData?.totalMarks}
                    label='Tổng Điểm'
                    focused
                    variant='outlined'
                    onChange={(e: any) => setTotalMarks(e.target.value)}
                  />
                  <TextField
                    sx={{
                      input: {
                        background: '#e9e9e9',
                      },
                    }}
                    type='number'
                    focused
                    defaultValue={examData?.passingMarks}
                    label='Số điểm đạt'
                    variant='outlined'
                    onChange={(e: any) => setPassingMarks(e.target.value)}
                  />
                </div>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Button
                    sx={{
                      display: 'flex',
                      width: '200px',
                      marginLeft: 'auto',
                      marginRight: 3,
                      backgroundColor: 'orange',
                      color: 'white',
                    }}
                    onClick={() =>
                      router.push('/admin/exams', {
                        scroll: false,
                      })
                    }
                  >
                    Hủy Bỏ
                  </Button>
                  <Button
                    type='submit'
                    sx={{
                      display: 'flex',
                      width: '200px',
                      backgroundColor: '#009FBD',
                      color: 'white',
                    }}
                  >
                    Lưu
                  </Button>
                </Box>
              </form>
            </>
          )}
        </>
      ),
    },

    {
      name: 'Câu Hỏi',
      component: (
        <>
          {/* <h1>Câu hỏi</h1> */}

          <Box
            sx={{
              display: 'flex',
              marginBottom: 3,
            }}
          >
            <Button
              sx={{
                display: 'flex',
                width: '200px',
                marginLeft: 'auto',
                marginRight: 3,
                backgroundColor: 'orange',
                color: 'white',
              }}
              onClick={() =>
                router.push('/admin/exams/add', {
                  scroll: false,
                })
              }
            >
              Hủy Bỏ
            </Button>
            <Button
              sx={{
                display: 'flex',
                width: '200px',
                backgroundColor: '#009FBD',
                color: 'white',
              }}
              onClick={handleOpen}
            >
              Thêm câu hỏi
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <h2 className='dark:text-white text-black'>
                  {selectedQuestion ? 'Sửa câu hỏi' : 'Thêm câu hỏi'}{' '}
                </h2>
                <form onSubmit={onSubmitQuestion}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'auto auto',
                      gap: '20px',
                      marginTop: 3,
                    }}
                  >
                    <TextField
                      type='text'
                      label='Tên câu hỏi'
                      variant='outlined'
                      focused
                      defaultValue={
                        selectedQuestion ? selectedQuestion?.name : ''
                      }
                      onChange={(e: any) => setQuestionName(e.target.value)}
                    />
                    <TextField
                      type='text'
                      label='Lựa chọn đúng'
                      variant='outlined'
                      focused
                      defaultValue={
                        selectedQuestion ? selectedQuestion?.correctOption : ''
                      }
                      onChange={(e: any) => setCorrectOption(e.target.value)}
                    />

                    <TextField
                      type='text'
                      label='Câu A'
                      variant='outlined'
                      focused
                      defaultValue={
                        selectedQuestion ? selectedQuestion?.options.A : ''
                      }
                      onChange={(e: any) => setA(e.target.value)}
                    />
                    <TextField
                      type='text'
                      label='Câu B'
                      variant='outlined'
                      focused
                      defaultValue={
                        selectedQuestion ? selectedQuestion?.options.B : ''
                      }
                      onChange={(e: any) => setB(e.target.value)}
                    />
                    <TextField
                      type='text'
                      label='Câu C'
                      variant='outlined'
                      focused
                      defaultValue={
                        selectedQuestion ? selectedQuestion?.options.C : ''
                      }
                      onChange={(e: any) => setC(e.target.value)}
                    />
                    <TextField
                      type='text'
                      label='Câu D'
                      variant='outlined'
                      focused
                      defaultValue={
                        selectedQuestion ? selectedQuestion?.options.D : ''
                      }
                      onChange={(e: any) => setD(e.target.value)}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      marginTop: 3,
                    }}
                  >
                    <Button
                      sx={{
                        display: 'flex',
                        width: '200px',
                        marginLeft: 'auto',
                        marginRight: 3,
                        backgroundColor: 'orange',
                        color: 'white',
                      }}
                      onClick={() => handleClose()}
                    >
                      Hủy Bỏ
                    </Button>
                    <Button
                      type='submit'
                      sx={{
                        display: 'flex',
                        width: '200px',
                        backgroundColor: '#009FBD',
                        color: 'white',
                      }}
                    >
                      Lưu
                    </Button>
                  </Box>
                </form>
              </Box>
            </Modal>
          </Box>
          <MuiTable />
        </>
      ),
    },
  ];

  return (
    <div className='w-full min-h-[100vh] px-2 gap-5 justify-center items-center dark:!text-white'>
      <div>
        <WidgetWrapper>
          <div className='flex items-center gap-5 mb-2'>
            {/* <Button
              className=' cursor-pointer px-5 py-3'
              onClick={() =>
                router.push('/admin/exams', {
                  scroll: false,
                })
              }
            >
              <ArrowBackIosNewOutlined />
            </Button> */}
            <PageTitle title={params?.id ? 'Sửa Bài Test' : 'Thêm Bài Test'} />
          </div>
          <Divider sx={{ marginBottom: 2 }}></Divider>

          <TabsNotification
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></TabsNotification>
        </WidgetWrapper>
      </div>
    </div>
  );
};

export default AddEditExam;
