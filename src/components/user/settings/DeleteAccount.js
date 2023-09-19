import { Send } from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { deleteUser } from 'firebase/auth';
import { useAuth } from '../../../context/AuthContext';

const DeleteAccount = () => {
  // Accessing context and utility functions from useAuth
  const { currentUser, setLoading, setAlert, setModal, modal } = useAuth();

  // Function to handle form submission when deleting the account
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Delete the user's account from Firebase Authentication
      await deleteUser(currentUser);

      // Close the modal and show a success alert
      setModal({ ...modal, isOpen: false });
      setAlert({
        isAlert: true,
        severity: 'success',
        message: 'Your account has been deleted',
        timeout: 8000,
        location: 'main',
      });
    } catch (error) {
      // Handle and display any errors that occur during the account deletion process
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
        <DialogContentText>
          Are you sure you want to delete your account? This action will delete
          your account details.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" endIcon={<Send />} type="submit">
          Confirm
        </Button>
      </DialogActions>
    </form>
  );
};

export default DeleteAccount;
