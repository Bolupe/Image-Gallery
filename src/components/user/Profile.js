import {
  Avatar,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SubmitButton from './inputs/SubmitButton';
import { updateProfile } from 'firebase/auth';

const Profile = () => {
  // Accessing context and utility functions from useAuth
  const { currentUser, setLoading, setAlert } = useAuth();
  const [name, setName] = useState(currentUser?.displayName);

  // Function to handle form submission when updating the profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update the user's profile with the new display name
      await updateProfile(currentUser, { displayName: name });

      setAlert({
        isAlert: true,
        severity: 'success',
        message: 'Your profile has been updated',
        timeout: 3000,
        location: 'modal',
      });
    } catch (error) {
      // Handle and display errors that occur during the profile update process
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
          You can update your profile by updating these fields:
        </DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          type="text"
          inputProps={{ minLength: 2 }}
          fullWidth
          variant="standard"
          value={name || ''}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Avatar
          src={currentUser?.photoURL}
          sx={{ width: 75, height: 75, cursor: 'pointer' }}
        />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default Profile;
