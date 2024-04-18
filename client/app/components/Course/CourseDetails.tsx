import CoursePlayer from '../../utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import Link from 'next/link';
import { format } from 'timeago.js';
import React, { useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { styles } from '../styles/style';
import CourseContentList from '../Course/CourseCardContentList';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../Payment/CheckOutForm';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Image from 'next/image';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { useCreateOrderFreeMutation } from '@/redux/features/orders/ordersApi';
import toast from 'react-hot-toast';

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails = ({ data, clientSecret, stripePromise }: Props) => {
  const { data: userData, refetch } = useLoadUserQuery({});
  const user = userData?.user;
  const [open, setOpen] = useState(false);

  const discountPercentenge =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = discountPercentenge.toFixed(0);

  const [createOrderFree] = useCreateOrderFreeMutation();

  const isPurchased =
    user && user?.courses?.find((item: any) => item?._id === data?._id);
  const handleOrder = async (e: any) => {
    if (user) {
      //free
      if (data?.price === 0) {
        await createOrderFree({ courseId: data?._id });
        window.location.reload();
      } else {
        // open pay
        setOpen(true);
      }
    } else {
      toast.error('Bạn chưa đăng nhập!');
    }
  };

  return (
    <div>
      <div className='w-[90%] 800px:w-[90%] m-auto py-5'>
        <div className='w-full flex flex-col-reverse 800px:flex-row'>
          <div className='w-full 800px:w-[65%] 800px:pr-5'>
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              {data?.name}
            </h1>
            <div className='flex items-center justify-between pt-3'>
              <div className='flex items-center'>
                <Ratings rating={data?.ratings} />
                <h5 className='text-black dark:text-white'>
                  {data?.reviews?.length} Đánh giá
                </h5>
              </div>
              <h5 className='text-black dark:text-white'>
                {data?.purchased} Học sinh
              </h5>
            </div>
            <br />
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              Bạn sẽ học được gì từ khóa học này?
            </h1>
            <div>
              {data?.benefits?.map((item: any, index: number) => (
                <div className='flex items-center py-2' key={index}>
                  <div className='w-4 mr-1'>
                    <IoCheckmarkDoneOutline
                      size={20}
                      className='text-black dark:text-white'
                    />
                  </div>
                  <p className='pl-2 text-black dark:text-white'>
                    {item?.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
              <div>
                <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                  Điều kiện tiên quyết để bắt đầu khóa học này là gì?
                </h1>
                {data?.prerequisites?.map((item: any, index: number) => (
                  <div className='flex items-center py-2' key={index}>
                    <div className='w-4 mr-1'>
                      <IoCheckmarkDoneOutline
                        size={20}
                        className='text-black dark:text-white'
                      />
                    </div>
                    <p className='pl-2 text-black dark:text-white'>
                      {item?.title}
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
                  {data?.description}
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
                      <div className='w-[50px] h-[50px]'>
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png'
                          }
                          width={50}
                          height={50}
                          alt=''
                          className='w-[50px] h-[50px] rounded-full object-cover'
                        />
                      </div>
                      <div className='hidden md:block pl-2'>
                        <div className='flex items-center'>
                          <h5 className='text-lg pr-2 text-black dark:text-white'>
                            {item?.user?.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className='text-black dark:text-white'>
                          {item?.comment}
                        </p>
                        <small className=' dark:text-[#ffffff83] text-black'>
                          {format(item?.createdAt)} •
                        </small>
                      </div>
                      <div className='pl-2 flex md:hidden items-center'>
                        <h5 className='text-lg pr-2 text-black dark:text-white'>
                          {item?.user?.name}
                        </h5>
                        <Ratings rating={item?.rating} />
                      </div>
                    </div>
                    {item?.commentReplies?.map((i: any, index: number) => (
                      <div className='w-full flex 800px:ml-16 my-5'>
                        <div className='w-[50px] h-[50px]'>
                          <Image
                            src={
                              i?.user?.avatar
                                ? i.user.avatar.url
                                : 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png'
                            }
                            width={50}
                            height={50}
                            alt=''
                            className='w-[50px] h-[50px] rounded-full object-cover'
                          />
                        </div>
                        <div className='pl-2'>
                          <div className='flex items-center'>
                            <h5 className='text-[20px]'>{i.user.name}</h5>
                            {''}
                            <VscVerifiedFilled className='text-[#50c750] ml-2 text-[20px]' />
                          </div>
                          <p>{i?.comment}</p>
                          <small className='text-[#ffffff83]'>
                            {format(i?.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div className='w-full 800px:w-[35%] relative'>
            <div className='sticky top-[100px] left-0 z-50 w-full'>
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className='flex items-center dark:text-white text-black'>
                <h1 className='pt-5 text-[25px] '>
                  {data?.price > 0
                    ? `${(data?.price).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}`
                    : ' '}
                </h1>
                <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80'>
                  {data?.estimatedPrice > 0
                    ? `${(data?.estimatedPrice).toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}`
                    : ' '}
                </h5>
                <h4 className='pl-5 pt-4 text-[22px]'>
                  {data?.estimatedPrice > 0 && data?.price > 0
                    ? `Giảm ${discountPercentengePrice} %`
                    : '  '}
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
                    className={`${styles.button} my-3 font-Poppins h-12 py-6 !bg-[crimson] cursor-not-allowed !w-[200px] p-5 text-center`}
                    onClick={handleOrder}
                  >
                    {data?.price > 0
                      ? `Mua Ngay (${(data?.price).toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })})`
                      : 'Đăng Ký (Miễn phí)'}
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
              <div className='w-full'></div>{' '}
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm
                    setOpen={setOpen}
                    data={data}
                    user={user}
                    refetch={refetch}
                  />
                </Elements>
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
