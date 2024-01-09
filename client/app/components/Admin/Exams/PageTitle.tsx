import { Box, Typography } from '@mui/material';
import React from 'react';

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center dark:!text-white text-black'>
      <Typography variant='h3'>{title}</Typography>
    </div>
  );
};

export default PageTitle;
