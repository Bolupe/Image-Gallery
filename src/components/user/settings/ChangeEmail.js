import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { updateEmail } from 'firebase/auth';
import { useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import EmailField from '../inputs/EmailField';
import SubmitButton from '../inputs/SubmitButton';

const ChangeEmail = () => {
  // Accessing context and utility functions from useAuth
  const { currentUser, setLoading, setAlert, setModal, modal } = useAuth();
  const emailRef = useRef();

  // Function to handle form submission when changing the email
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update the email associated with the user's account
      await updateEmail(currentUser, emailRef.current.value);
      setModal({ ...modal, isOpen: false });
      setAlert({
        isAlert: true,
        severity: 'success',
        message: 'Your email has been updated',
        timeout: 8000,
        location: 'main',
      });
    } catch (error) {
      // Handle and display errors that occur during the email update process
      setAlert({
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
        location: 'modal',
      });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Please Enter your new email:</DialogContentText>
        <EmailField {...{ emailRef, defaultValue: currentUser?.email }} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ChangeEmail;
