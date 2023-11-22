'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';

const HeroSection = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (search === '') {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <section className='lg:py-16'>
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='col-span-8 place-self-center text-center sm:text-left justify-self-start'
        >
          <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-600'>
              Xin chào bạn,
            </span>
            <br></br>
            <TypeAnimation
              className='dark:text-white text-black'
              sequence={[
                'Đã Đến NetSkillD',
                1000,
                'Học Lập Trình',
                1000,
                'MERN',
                1000,
                'Redux',
                1000,
                'Machine Learning',
                1000,
              ]}
              wrapper='span'
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className='text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl dark:text-white'>
            &#34; Đến với chúng tôi, bạn sẽ khám phá thế giới lập trình - nơi
            sáng tạo không giới hạn.&#34;
          </p>
          <div>
            <Link
              href='/contact'
              className='px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-purple-500 to-green-500 hover:bg-slate-200 text-white'
            >
              Khám Phá Ngay
            </Link>
            <Link
              href='/'
              className='px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-purple-500 to-green-500 hover:bg-slate-800 text-white mt-3'
            >
              <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>
                Đăng Ký Ngay
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='col-span-4 place-self-center mt-4 lg:mt-0'
        >
          <div className='rounded-full bg-[#393838c1] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative'>
            <Image
              src='/images/hero-image.png'
              alt='hero image'
              className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
      <div className='mt-10 1500px:w-[55%] 1100px:w-[78%] w-[80%] h-[70px] bg-transparent relative'>
        <input
          type='search'
          placeholder='Tìm khóa học ...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='text-xl bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder::text-[#ffffdd] rounded-[5px] p-4 w-full h-full outline-none text-black dark:text-white'
        />
        <div
          className='absolute flex items-center justify-center w-[70px] cursor-pointer h-[70px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]'
          onClick={handleSearch}
        >
          <BiSearch className='text-white' size={30} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
