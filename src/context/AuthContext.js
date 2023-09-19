import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { auth } from '../firebase/config';

// Create an authentication context
const authContext = createContext();

// Create a custom hook for accessing the authentication context
export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {
  // Initialize state variables
  const [currentUser, setCurrentUser] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, title: '', content: '' });
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: 'info',
    message: '',
    timeout: null,
    location: '',
  });
  const [loading, setLoading] = useState(false);

  // Define functions for user authentication
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Use effect to monitor user authentication state
  useEffect(() => {
    // Subscribe to changes in user authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log('user status changed: ', user);
    });

    // Unsubscribe when the component unmounts
    return unsubscribe;
  }, []);

  // Create a value object containing authentication-related data and functions
  const value = {
    currentUser,
    signUp,
    login,
    logout,
    modal,
    setModal,
    loginWithGoogle,
    alert,
    setAlert,
    loading,
    setLoading,
    resetPassword,
  };

  // Provide the authentication context to child components
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;