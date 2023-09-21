import * as React from 'react';
import { Box, Collapse, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const LoginNotification = () => {
  const { setAlert } = useAuth();

  return (
    <Box sx={{ mb: 2 }}>
      <Collapse in={true}>
        <Alert
          severity="info"
        >
          Kindly Log In to view images clearly and use the the drag and drop feature.
        </Alert>
      </Collapse>
    </Box>
  );
};

export default LoginNotification;
