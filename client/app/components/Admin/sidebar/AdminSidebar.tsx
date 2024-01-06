import React, { FC, useState, useEffect } from 'react';

import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon,
  AssignmentOutlinedIcon,
  ChatBubbleIcon,
  BookIcon,
  EditNoteIcon,
} from './Icon';
import { Box, IconButton, Typography } from '@mui/material';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import avatarDefault from '../../../../public/assests/avatar.png';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

type Props = {};

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className='!text-[16px] !font-Poppins'>{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  const logoutHandler = () => {
    setlogout(true);
  };

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${
            theme === 'dark' ? '#111C43 !important' : '#fff !important'
          }`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
          opacity: 1,
        },
        '& .pro-menu-item': {
          color: `${theme !== 'dark' && '#000'}`,
        },
      }}
      className='dark:!bg-[#111C43] bg-[#bec6e0]'
    >
      {/* ProSidebar */}
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: isCollapsed ? '0%' : '16%',
        }}
      >
        {/* Menu */}
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
            }}
          >
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
              >
                <Link href='/admin'>
                  <h3 className='text-[20px] font-Poppins uppercase dark:text-white text-black'>
                    NetSkillD - Admin
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className='inline-block'
                >
                  <ArrowBackIosIcon className='text-black dark:text-[#ffffffc1]' />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Image
                  alt='profile-user'
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    border: '3px solid #5b6fe6',
                    objectFit: 'cover',
                    width: '100px',
                    height: '100px',
                  }}
                />
              </Box>

              <Box textAlign='center'>
                <Typography
                  variant='h4'
                  className='!text-[20px] text-black dark:text-[#ffffffc1]'
                  sx={{ m: '10px 0 0 0' }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{ m: '10px 0 0 0' }}
                  className='!text-[20px] text dark:text-[#ffffffc1] capitalize'
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Bảng Điều Khiển'
              to='/admin'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Dữ Liệu'}
            </Typography>

            <Item
              title='Người Dùng'
              to='/admin/users'
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Hóa Đơn'
              to='/admin/invoices'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Nội Dung'}
            </Typography>

            <Item
              title='Tạo Khóa Học'
              to='/admin/create-course'
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Khóa Học'
              to='/admin/courses'
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Bài Tập'
              to='/admin/exams'
              icon={<AssignmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Bài Viết'}
            </Typography>

            <Item
              title='Bài Viết'
              to='/admin/blogs'
              icon={<BookIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Thêm Bài Viết"
              to="/admin/create-blog"
              icon={<EditNoteIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Tùy Chỉnh'}
            </Typography>

            {/* <Item
              title='Bố Cục'
              to='/admin/hero'
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title='Câu Hỏi'
              to='/admin/faq'
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Danh Mục'
              to='/admin/categories'
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Điều Khiển'}
            </Typography>

            <Item
              title='Quản Lý Nhóm'
              to='/admin/team'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Phân Tích'}
            </Typography>

            <Item
              title='Khóa Học'
              to='/admin/courses-analytics'
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Đơn Hàng'
              to='/admin/orders-analytics'
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Người Dùng'
              to='/admin/users-analytics'
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Tiện Ích'}
            </Typography>

            <Item
              title='Tư Vấn'
              to='/admin/chat'
              icon={<ChatBubbleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={logoutHandler}>
              <Item
                title='Thoát'
                to='/'
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
