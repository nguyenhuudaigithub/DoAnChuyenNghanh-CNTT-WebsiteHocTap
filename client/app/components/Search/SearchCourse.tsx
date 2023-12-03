import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';

type Props = {};

const SearchCourse = (props: Props) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  //   const handleSearch = () => {
  //     router.push(`/courses?title=${search}`);
  //   };

  const handleSearch = () => {
    if (search.length < 2) {
      alert('Vui lòng nhập ít nhất 2 ký tự để tìm kiếm');
    } else {
      router.push(`/courses?title=${search}`);
    }
  };
  return (
    <>
      <div className='relative pr-3 md:mr-0 md:block '>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-500'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            ></path>
          </svg>
        </div>
        {/* <input
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          type="search"
          value={search}
          id="email-adress-icon"
          className="dark:bg-[#111827] bg-gray-50 border border-gray-300 dark:text-white text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
          placeholder="Tìm kiếm..."
        /> */}
        <input
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          type='search'
          value={search}
          id='email-adress-icon'
          className='dark:bg-[#111827] bg-gray-50 border border-gray-300 dark:text-white text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2'
          placeholder='Tìm kiếm...'
        />
      </div>
    </>
  );
};

export default SearchCourse;
