import { Close } from '@mui/icons-material';
import { Alert, Box, Collapse, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const Notify = () => {
  const alertRef = useRef();
  const { alert, setAlert } = useAuth();

  useEffect(() => {
    // Scroll to the notification area when an alert is displayed
    alertRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });

    let timer;
    if (alert.timeout) {
      // Set a timer to hide the alert after a specified timeout
      timer = setTimeout(() => {
        setAlert({ ...alert, isAlert: false });
      }, alert.timeout);
    }

    // Clear the timer when the component unmounts or when the timeout changes
    return () => clearTimeout(timer);
  }, [alert, setAlert]);

  return (
    <Box sx={{ mb: 2 }} ref={alertRef}>
      {/* Display the alert using MUI Collapse */}
      <Collapse in={alert.isAlert}>
        <Alert
          severity={alert.severity}
          action={
            <IconButton
              aria-label="Close"
              size="small"
              onClick={() => setAlert({ ...alert, isAlert: false })}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          {alert.message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Notify;
