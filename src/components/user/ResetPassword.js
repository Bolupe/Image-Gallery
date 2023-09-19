import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmailField from './inputs/EmailField';
import SubmitButton from './inputs/SubmitButton';

const ResetPassword = () => {
  // Access authentication-related data and functions from context
  const { setLoading, setAlert, setModal, modal, resetPassword } = useAuth();
  
  // Reference to the email input field
  const emailRef = useRef();

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Trigger the password reset process using the provided email
      await resetPassword(emailRef.current.value);
      setModal({ ...modal, isOpen: false });
      setAlert({
        isAlert: true,
        severity: 'success',
        message: 'Reset link has been sent to your email inbox',
        timeout: 8000,
        location: 'main',
      });
    } catch (error) {
      // Handle errors and display an error message
      setAlert({
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
        location: 'modal',
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Please enter your email address:</DialogContentText>
        
        {/* EmailField component for inputting the email */}
        <EmailField {...{ emailRef }} />
      </DialogContent>
      
      {/* DialogActions for the submit button */}
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ResetPassword;
