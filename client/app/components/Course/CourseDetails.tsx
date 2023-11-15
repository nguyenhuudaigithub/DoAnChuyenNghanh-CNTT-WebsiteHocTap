import CoursePlayer from '@/app/utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import { Rating } from '@mui/material';
import Link from 'next/link';
import { format } from 'path';
import React, { useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { styles } from '../styles/style';
import CourseContentList from '../Course/CourseCardContentList';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../Payment/CheckOutForm';

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails = ({ data, clientSecret, stripePromise }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);

  const discountPercentenge =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = discountPercentenge.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item?._id === data?._id);
  const handleOrder = (e: any) => {
    setOpen(true);
  };

  return (
    <div>
      <div className='w- [90%] 800px:w-[90%] m-auto py-5'>
        <div className='w-full flex flex-col-reverse 800px:flex-row'>
          <div className='w-full 800px:w-[65%] 800px:pr-5'>
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              {data.name}
            </h1>
            <div className='flex items-center justify-between pt-3'>
              <div className='flex items-center'>
                <Ratings rating={data.ratings} />
                <h5 className='text-black dark:text-white'>
                  {data.reviews?.length} Đánh giá
                </h5>
              </div>
              <h5 className='text-black dark:text-white'>
                {data.purchased} Học sinh
              </h5>
            </div>
            <br />
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              Bạn sẽ học được gì từ khóa học này?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div className='flex items-center py-2' key={index}>
                  <div className='w-4 mr-1'>
                    <IoCheckmarkDoneOutline
                      size={20}
                      className='text-black dark:text-white'
                    />
                  </div>
                  <p className='pl-2 text-black dark:text-white'>
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
              <div>
                <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                  Điều kiện tiên quyết để bắt đầu khóa học này là gì?
                </h1>
                {data.prerequisites?.map((item: any, index: number) => (
                  <div className='flex items-center py-2' key={index}>
                    <div className='w-4 mr-1'>
                      <IoCheckmarkDoneOutline
                        size={20}
                        className='text-black dark:text-white'
                      />
                    </div>
                    <p className='pl-2 text-black dark:text-white'>
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              <br />
              <br />
              <div>
                <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                  Tổng quan về khóa học
                </h1>
                <CourseContentList data={data?.courseData} isDemo={true} />
              </div>
              <br />
              <br />
              <div className='w-full'>
                <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                  Chi tiết khóa học
                </h1>
                <p className='text-lg mt-5 whitespace-pre-line w-full overflow-hidden text-black dark:text-white'>
                  {data.description}
                </p>
              </div>
              <br />
              <br />
              <div className='w-full'>
                <div className='flex items-center'>
                  <Ratings rating={data?.ratings} />
                  <div className='mb-2 md:mb-0' />
                  <h5
                    className={`text-2xl font-Poppins text-black ${
                      Number.isInteger(data?.ratings) ? 'dark:text-white' : ''
                    }`}
                  >
                    {data?.ratings ? data?.ratings.toFixed(2) : 'Không có'} đánh
                    giá ({data?.reviews?.length || 0} Đánh giá)
                  </h5>
                </div>
              </div>
              <br />
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className='w-full pb-4' key={index}>
                    <div className='flex'>
                      <div className='w-12 h-12'>
                        <div className='w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center cursor-pointer'>
                          <h1 className='uppercase text-lg text-black dark:text-white'>
                            {item.user.name.slice(0, 2)}
                          </h1>
                        </div>
                      </div>
                      <div className='hidden md:block pl-2'>
                        <div className='flex items-center'>
                          <h5 className='text-lg pr-2 text-black dark:text-white'>
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className='text-black dark:text-white'>
                          {item.comment}
                        </p>
                        <small className='text-gray-500 dark:text-gray-300'>
                          {format(item.createdAt)}.
                        </small>
                      </div>
                      <div className='pl-2 flex md:hidden items-center'>
                        <h5 className='text-lg pr-2 text-black dark:text-white'>
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className='w-full 800px:w-[35%] relative'>
            <div className='sticky top-[100px] left-0 z-50 w-full'>
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className='flex items-center'>
                <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                  {data.price === 0 ? 'Miễn Phí' : `${data.price} VNĐ`}
                </h1>
                <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white'>
                  {data.estimatedPrice} VNĐ
                </h5>
                <h4 className='pl-5 pt-4 text-[22px] ☐ text-black dark:text-white'>
                  Giảm {discountPercentengePrice}%
                </h4>
              </div>

              <div className='flex items-center'>
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data._id}`}
                  >
                    Truy Cập
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} my-3 font-Poppins h-12 !bg-[crimson] cursor-not-allowed !w-[200px] p-5 text-center`}
                    onClick={handleOrder}
                  >
                    Mua Ngay ({data.price}VNĐ)
                  </div>
                )}
              </div>
              <br />

              <ul className='dark:text-white text-black'>
                <li className='pb-1 mt-3'>• Bao gồm mã nguồn</li>
                <li className='pb-1'>• Quyền truy cập trọn đời</li>
                <li className='pb-1'>• Giấy chứng nhận hoàn thành</li>
                <li className='pb-3 800px:pb-1'>• Hỗ trợ cao cấp</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className='w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center'>
            <div className='w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3'>
              <div className='w-full flex justify-end'>
                <IoCloseOutline
                  size={40}
                  className='text-black cursor-pointer'
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className='w-full'>
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
