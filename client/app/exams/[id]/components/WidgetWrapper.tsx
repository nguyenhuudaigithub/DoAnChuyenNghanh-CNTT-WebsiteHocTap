import { Box } from '@mui/material';
import { styled } from '@mui/system';

const WidgetWrapper = styled(Box)(({}) => ({
  padding: '1.5rem 1.5rem 0.75rem 1.5rem',
  backgroundColor: 'dark:bg-white bg-black',
  borderRadius: '0.75rem',
}));

export default WidgetWrapper;
