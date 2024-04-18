import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddEditQuestion = ({
  open,
  setOpen,
  handleClose,
}: {
  open: any;
  setOpen: any;
  handleClose: any;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Thêm câu hỏi
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Hãy thêm cho chính xác vì nó là thứ giúp cho con người ta luôn đi đúng
          hướng
        </Typography>
        <Button
          sx={{
            display: 'flex',
            width: '100%',
            marginTop: 4,
            backgroundColor: '#009FBD',
            color: 'white',
          }}
        >
          Lưu
        </Button>
      </Box>
    </Modal>
  );
};

export default AddEditQuestion;
