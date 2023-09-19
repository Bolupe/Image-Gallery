import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Notify from './Notify';

const Modal = () => {
  // Access modal-related data and functions from context
  const {
    modal,
    setModal,
    alert: { location, isAlert },
    setAlert,
  } = useAuth();

  // Function to handle modal close
  const handleClose = () => {
    setModal({ ...modal, isOpen: false });
  };

  // Use effect to close alerts specific to the modal when the modal closes
  useEffect(() => {
    if (modal?.isOpen === false) {
      if (isAlert && location === 'modal') {
        setAlert({ ...setAlert, isAlert: false });
      }
    }
  }, [modal?.isOpen, isAlert, location, setAlert]);

  return (
    <Dialog open={modal.isOpen} onClose={handleClose}>
      <DialogTitle>
        {modal.title}
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {/* Display notifications specific to the modal location */}
      {location === 'modal' && <Notify />}
      {modal.content}
    </Dialog>
  );
};

export default Modal;
