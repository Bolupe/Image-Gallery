import * as React from 'react';
import { Box, Collapse, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../context/AuthContext';

const LoginNotification = () => {
  const { setAlert } = useAuth();

  const closeNotification = () => {
    // Set isAlert to false when the notification is closed
    setAlert((prevAlert) => ({ ...prevAlert, isAlert: false }));
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Collapse in={true}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="Close"
              size="small"
              onClick={closeNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          onClose={closeNotification} 
        >
          Please log in to view images clearly.
        </Alert>
      </Collapse>
    </Box>
  );
};

export default LoginNotification;
