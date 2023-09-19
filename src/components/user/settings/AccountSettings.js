import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { GoogleAuthProvider, reauthenticateWithPopup } from 'firebase/auth';
import { useAuth } from '../../../context/AuthContext';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';
import ReAuth from './ReAuth';

const AccountSettings = () => {
  const { currentUser, setModal, modal, setAlert } = useAuth();
  const isPasswordProvider =
    currentUser?.providerData[0].providerId === 'password';

  const handleAction = async (action) => {
    if (isPasswordProvider) {
      // If the user is authenticated via email/password, ask for re-authentication
      setModal({
        ...modal,
        title: 'Re-Login',
        content: <ReAuth {...{ action }} />,
      });
    } else {
      try {
        // If the user is authenticated via Google, re-authenticate with Google
        await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());

        // Handle different actions
        switch (action) {
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
        // Handle and display errors
        setAlert({
          isAlert: true,
          severity: 'error',
          message: error.message,
          timeout: 5000,
          location: 'modal',
        });
        console.log(error);
      }
    }
  };

  return (
    <>
      <DialogContent dividers>
        <DialogContentText>
          For security reasons, you need to provide your credentials to perform any of these actions:
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: 2, my: 2 }}>
        {isPasswordProvider && (
          <Button onClick={() => handleAction('changePassword')}>
            Change Password
          </Button>
        )}
        <Button onClick={() => handleAction('changeEmail')}>
          Change Email
        </Button>
        <Button onClick={() => handleAction('deleteAccount')}>
          Delete Account
        </Button>
      </DialogActions>
    </>
  );
};

export default AccountSettings;
