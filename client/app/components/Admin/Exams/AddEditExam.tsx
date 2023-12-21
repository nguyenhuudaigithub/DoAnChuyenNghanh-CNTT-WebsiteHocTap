import React, { useEffect, useRef, useState } from 'react';
import PageTitle from './PageTitle';

import {
  Box,
  Button,
  Divider,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
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
  // const [examName, setExamName] = useState('');
  // const [examDuration, setExamDuration] = useState(0);
  // const [category, setCategory] = useState('');
  // const [totalMarks, setTotalMarks] = useState(0);
  // const [passingMarks, setPassingMarks] = useState(0);

  let {
    data: categories,
    isLoading,
    refetch,
  } = useGetHeroDataQuery('Categories', {
    refetchOnMountOrArgChange: true,
  });

  const router = useRouter();

  const examName = useRef('');
  const examDuration = useRef(0);
  const category = useRef('');
  const totalMarks = useRef(0);
  const passingMarks = useRef(0);

  const questionName = useRef('');
  const correctOption = useRef('');
  const A = useRef('');
  const B = useRef('');
  const C = useRef('');
  const D = useRef('');

  const [selectedQuestion, setSelectedQuestion] = useState();

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
        `http://localhost:8000/api/v1/edit-exam-by-id`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: questionName.current,
            correctOption: correctOption.current,
            options: {
              A: A.current,
              B: B.current,
              C: C.current,
              D: D.current,
            },
            examId: params?.id,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
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
    } else {
      const response = await fetch(
        `http://localhost:8000/api/v1/add-question-to-exam`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: questionName.current,
            correctOption: correctOption.current,
            options: {
              A: A.current,
              B: B.current,
              C: C.current,
              D: D.current,
            },
            exam: params?.id,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
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
      const response = await fetch(
        `http://localhost:8000/api/v1/edit-exam-by-id`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            examId: params?.id,
            // name: examName,
            // duration: examDuration,
            // category,
            // totalMarks,
            // passingMarks,

            name: examName.current,
            duration: examDuration.current,
            category: category.current,
            totalMarks: totalMarks.current,
            passingMarks: passingMarks.current,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
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
      const response = await fetch(`http://localhost:8000/api/v1/add-exam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // name: examName,
          // duration: examDuration,
          // category,
          // totalMarks,
          // passingMarks,

          name: examName.current,
          duration: examDuration.current,
          category: category.current,
          totalMarks: totalMarks.current,
          passingMarks: passingMarks.current,
        }),
      });
      const data = await response.json();
      if (data.success) {
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
    setExamData(data?.data);
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
              <TableCell align='center'>Options</TableCell>
              <TableCell align='center'>Câu đúng</TableCell>
              <TableCell align='center'>Action</TableCell>
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
                  <div className='flex gap-3'>
                    <IconButton
                      onClick={() => {
                        setSelectedQuestion(row);
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
      name: 'ExamDetails',
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
                    value={examData?.name}
                    type='text'
                    // label={`${examData.name ? examData.name : 'Exam Name'}`}
                    label='Exam Name'
                    // className='bg-red-400'
                    // value={examData?.name || ''}
                    variant='outlined'
                    // onChange={(e) => setExamName(e.target.value)}
                    onChange={(e: any) => (examName.current = e.target.value)}
                  />
                  <TextField
                    sx={{
                      input: {
                        background: '#e9e9e9',
                      },
                    }}
                    value={examData?.duration}
                    // label={`${
                    //   examData.duration ? examData.duration : 'Exam Duration'
                    // }`}
                    label='Exam Duration'
                    type='number'
                    // value={examData?.duration || ''}
                    variant='outlined'
                    // onChange={(e) => setExamDuration(e.target.value)}
                    onChange={(e: any) =>
                      (examDuration.current = e.target.value)
                    }
                  />
                  <div
                    className='dark:!text-white w-full bg-[#e9e9e9]'
                    // value={category}
                    // label='Category'
                    // onChange={handleChange}
                  >
                    <TextField
                      sx={{
                        input: {
                          background: '#e9e9e9',
                        },
                      }}
                      value={getNameCategory(examData?.category)}
                      label={`${
                        examData?.category
                          ? getNameCategory(examData?.category)
                          : 'Category'
                      }`}
                      select
                      // value={examData?.category || ''}
                      // onChange={handleChange}
                      onChange={(e: any) => (category.current = e.target.value)}
                      fullWidth
                    >
                      <MenuItem selected disabled value=''>
                        Chọn thể loại
                      </MenuItem>
                      {categories &&
                        categories?.layout?.categories.map((category: any) => (
                          <MenuItem value={category?.title}>
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
                    value={examData?.totalMarks}
                    // label={`${
                    //   examData.totalMarks ? examData.totalMarks : 'Total Marks'
                    // }`}
                    label='Total Marks'
                    // value={examData?.totalMarks || ''}
                    variant='outlined'
                    // onChange={(e) => setTotalMarks(e.target.value)}
                    onChange={(e: any) => (totalMarks.current = e.target.value)}
                  />
                  <TextField
                    sx={{
                      input: {
                        background: '#e9e9e9',
                      },
                    }}
                    type='number'
                    value={examData?.passingMarks}
                    // label={`${
                    //   examData.passingMarks
                    //     ? examData.passingMarks
                    //     : 'Passing Marks'
                    // }`}
                    label='Passing Marks'
                    // value={examData?.passingMarks || ''}
                    variant='outlined'
                    // onChange={(e) => setPassingMarks(e.target.value)}
                    onChange={(e: any) =>
                      (passingMarks.current = e.target.value)
                    }
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
                      router.push('/admin/exams/add', {
                        scroll: false,
                      })
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    sx={{
                      display: 'flex',
                      width: '200px',
                      // marginLeft: 'auto',
                      backgroundColor: '#009FBD',
                      color: 'white',
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </form>
            </>
          )}
        </>
      ),
    },

    {
      name: 'Questions',
      component: (
        <>
          <h1>Câu hỏi</h1>

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
              Cancel
            </Button>
            <Button
              sx={{
                display: 'flex',
                width: '200px',
                // marginLeft: 'auto',
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
                <h2>{selectedQuestion ? 'Sửa câu hỏi' : 'Thêm câu hỏi'} </h2>
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
                      label='Question Name'
                      // value={examData?.name || ''}
                      variant='outlined'
                      // onChange={(e) => setExamName(e.target.value)}
                      onChange={(e: any) =>
                        (questionName.current = e.target.value)
                      }
                    />
                    <TextField
                      type='text'
                      label='Correct Option'
                      // value={examData?.duration || ''}
                      variant='outlined'
                      // onChange={(e) => setExamDuration(e.target.value)}
                      onChange={(e: any) =>
                        (correctOption.current = e.target.value)
                      }
                    />

                    <TextField
                      type='text'
                      label='Option A'
                      // value={examData?.totalMarks || ''}
                      variant='outlined'
                      // onChange={(e) => setTotalMarks(e.target.value)}
                      onChange={(e: any) => (A.current = e.target.value)}
                    />
                    <TextField
                      type='text'
                      label='Option B'
                      // value={examData?.totalMarks || ''}
                      variant='outlined'
                      // onChange={(e) => setTotalMarks(e.target.value)}
                      onChange={(e: any) => (B.current = e.target.value)}
                    />
                    <TextField
                      type='text'
                      label='Option C'
                      // value={examData?.totalMarks || ''}
                      variant='outlined'
                      // onChange={(e) => setTotalMarks(e.target.value)}
                      onChange={(e: any) => (C.current = e.target.value)}
                    />
                    <TextField
                      type='text'
                      label='Option D'
                      // value={examData?.totalMarks || ''}
                      variant='outlined'
                      // onChange={(e) => setTotalMarks(e.target.value)}
                      onChange={(e: any) => (D.current = e.target.value)}
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
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      sx={{
                        display: 'flex',
                        width: '200px',
                        // marginLeft: 'auto',
                        backgroundColor: '#009FBD',
                        color: 'white',
                      }}
                    >
                      Save
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
    <div className='w-full px-2 gap-5 justify-center items-center dark:!text-white'>
      <div>
        <WidgetWrapper>
          <div className='flex items-center gap-5 mb-2'>
            <Button
              className=' cursor-pointer px-5 py-3'
              onClick={() =>
                router.push('/admin/exams/add', {
                  scroll: false,
                })
              }
            >
              <ArrowBackIosNewOutlined />
            </Button>
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
