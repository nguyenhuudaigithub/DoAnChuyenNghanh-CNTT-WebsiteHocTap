import Link from 'next/link';
import React, { FC } from 'react';
import SearchCourse from '../components/Search/SearchCourse';
import { useSelector } from 'react-redux';

export const navItemsData = [
  {
    name: 'Trang Chủ',
    url: '/',
  },
  {
    name: 'Khóa Học',
    url: '/course',
  },
  {
    name: 'Bài Viết',
    url: '/blog',
  },
  {
    name: 'Bài Tập',
    url: '/exams',
  },
  {
    name: 'Trò Chuyện',
    url: '/chat',
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
      <div className='hidden 800px:flex'>
        {navItemsData &&
          navItemsData
            .filter((nav) => {
              if (!user && nav.url === '/chat') {
                return false;
              }
              return true;
            })
            .map((item, index) => (
              <Link href={`${item.url}`} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? 'dark:text-[#25a25a] text-[crimson]'
                      : 'dark:text-white text-black'
                  } text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
        <div className='mt-[-8px]'>
          <SearchCourse />
        </div>
      </div>
      {isMobile && (
        <>
          <div className='800px:hidden mt-5'>
            <div className='w-full text-center py-6'>
              <Link
                href={'/'}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                NETSKILLD
              </Link>
            </div>
            {navItemsData &&
              navItemsData
                .filter((nav) => {
                  if (!user && nav.url === '/history') {
                    return false;
                  }
                  return true;
                })
                .map((item, index) => (
                  <Link href={`${item.url}`} key={index} passHref>
                    <span
                      className={`${
                        activeItem === index
                          ? 'dark:text-[#25a25a] text-[crimson]'
                          : 'dark:text-white text-black'
                      } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
          </div>
        </>
      )}
    </>
  );
};

export default NavItems;
