import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item?._id}` : `/course-access/${item._id}`}
    >
      <div className='flex flex-col justify-between w-full min-h-[44vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner'>
        <div className='w-full h-[220px] object-cover'>
          <Image
            src={item?.thumbnail?.url}
            width={450}
            height={400}
            priority
            // objectFit='cover'
            className='rounded-lg w-full h-full'
            alt=''
          />
        </div>
        <div>
          <h1 className='font-Poppins text-[16px] text-black dark:text-[#fff]'>
            {item?.name}
          </h1>

          <div className='w-full flex items-center justify-between pt-2'>
            <Ratings rating={item?.ratings} />
          </div>
          <div className='w-full flex items-center justify-between pt-3'>
            <div className='flex'>
              <h3 className='text-black dark:text-[#fff]'>
                {item?.price === 0
                  ? 'Miễn phí'
                  : (item?.price).toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
              </h3>
              <h5 className='pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]'>
                {item?.estimatedPrice > 0
                  ? `${(item?.estimatedPrice).toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}`
                  : ' '}
              </h5>
            </div>
          </div>
          <div className='w-full flex items-center justify-between pt-3 text-black dark:text-[#fff]'>
            <AiOutlineUnorderedList size={20} fill='#fff' />
            <h5>{item?.courseData?.length} Khóa học</h5>
            <h5 className={`${isProfile && 'hidden 800px:inline'}`}>
              {item?.purchased} Học sinh
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
