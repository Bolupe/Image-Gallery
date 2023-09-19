import { Close } from '@mui/icons-material';
import { Alert, Box, Button, Collapse, IconButton } from '@mui/material';
import { sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Verification = () => {
  // Access user-related data and functions from context
  const { currentUser, setAlert, setLoading } = useAuth();

  // State to manage the initial open state and button click status
  const [open, setOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  // Function to trigger email verification
  const verify = async () => {
    setIsClicked(true);
    setLoading(true);

    try {
      // Send email verification request to Firebase
      await sendEmailVerification(currentUser);
      setAlert({
        isAlert: true,
        severity: 'info',
        message: 'Verification link has been sent to your email inbox',
        timeout: 8000,
        location: 'main',
      });
    } catch (error) {
      // Handle errors and display an error message
      setAlert({
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 8000,
        location: 'main',
      });
      console.log(error);
    }

    setLoading(false);
  };

  return (
    // Display verification alert only if the email is not verified
    currentUser?.emailVerified === false && (
      <Box>
        <Collapse in={open}>
          {/* Alert component for email verification */}
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="Close"
                size="small"
                onClick={() => setOpen(false)}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 3 }}
          >
            Your email has not been verified yet!
            <Button
              size="small"
              onClick={verify}
              disabled={isClicked}
              sx={{ lineHeight: 'initial' }}
            >
              Verify Now
            </Button>
          </Alert>
        </Collapse>
      </Box>
    )
  );
};

export default Verification;
