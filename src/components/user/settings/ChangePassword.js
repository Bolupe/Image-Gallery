import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { updatePassword } from 'firebase/auth';
import { useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import PasswordField from '../inputs/PasswordField';
import SubmitButton from '../inputs/SubmitButton';

const ChangePassword = () => {
  // Accessing context and utility functions from useAuth
  const { currentUser, setLoading, setAlert, setModal, modal } = useAuth();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // Function to handle form submission when changing the password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if the entered passwords match
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        throw new Error('Passwords do not match');
      }
      // Update the password associated with the user's account
      await updatePassword(currentUser, passwordRef.current.value);
      setModal({ ...modal, isOpen: false });
      setAlert({
        isAlert: true,
        severity: 'success',
        message: 'Your password has been updated',
        timeout: 8000,
        location: 'main',
      });
    } catch (error) {
      // Handle and display errors that occur during the password update process
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
        <DialogContentText>Please Enter your new Password:</DialogContentText>
        <PasswordField {...{ passwordRef }} />
        <PasswordField
          {...{
            passwordRef: confirmPasswordRef,
            id: 'confirmPassword',
            label: 'Confirm Password',
            autoFocus: false,
          }}
        />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ChangePassword;
