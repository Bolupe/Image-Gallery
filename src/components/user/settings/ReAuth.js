import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import PasswordField from '../inputs/PasswordField';
import SubmitButton from '../inputs/SubmitButton';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const ReAuth = ({ action }) => {
  // Accessing context and utility functions from useAuth
  const { currentUser, setLoading, setAlert, setModal, modal } = useAuth();
  
  // Ref for the password input
  const passwordRef = useRef();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Creating a credential using the current user's email and the entered password
    const credential = EmailAuthProvider.credential(
      currentUser?.email,
      passwordRef.current.value
    );
    
    try {
      // Reauthenticating the user with the provided credential
      await reauthenticateWithCredential(currentUser, credential);

      // Determining the action to take based on the 'action' prop
      switch (action) {
        case 'changePassword':
          setModal({
            ...modal,
            title: 'Update Password',
            content: <ChangePassword />,
          });
          break;
        case 'changeEmail':
          setModal({
            ...modal,
            title: 'Update Email',
            content: <ChangeEmail />,
          });
          break;
        case 'deleteAccount':
          setModal({
            ...modal,
            title: 'Delete Account',
            content: <DeleteAccount />,
          });
          break;
        default:
          throw new Error('No matching action');
      }
    } catch (error) {
      // Handling and displaying any errors that occur during reauthentication
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
          Please Enter your current Password:
        </DialogContentText>
        <PasswordField {...{ passwordRef }} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ReAuth;
