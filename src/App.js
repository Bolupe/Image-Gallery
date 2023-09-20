import Nav from './components/Nav';
import { Container } from '@mui/material';
import AuthContext from './context/AuthContext';
import Modal from './components/Modal';
import MainNotification from './components/MainNotification';
import Loading from './components/Loading';
import Verification from './components/user/Verification';
import Images from "./components/Images";
import Header from "./components/Header";
import SearchField from "./components/SearchField";
import useAxios from "./hooks/useAxios";
import React, { createContext, useState } from 'react';

// Create Context for image-related data
export const ImageContext = createContext();

function App() {
  // State for the search query
  const [searchImage, setSearchImage] = useState('');

  // Fetch image data using the useAxios custom hook
  const { response, isLoading, error, fetchData } = useAxios(`search/photos?page=1&query=wallpaper&client_id=${process.env.REACT_APP_ACCESS_KEY}`);

  // Create a context value to provide to child components
  const value = {
    response,
    isLoading,
    error,
    fetchData,
    searchImage,
    setSearchImage
  }

  return (
    // Container for the entire application
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: '3rem' }}>
      <AuthContext>
        {/* Loading component */}
        <Loading />
        
        {/* Modal component */}
        <Modal />

        {/* Verification component */}
        <Verification />
        
        {/* MainNotification component */}
        <MainNotification />
        
        {/* Navigation component */}
        <Nav />

        {/* ImageContext.Provider to provide context to child components */}
        <ImageContext.Provider value={value}>
          {/* Header component */}
          <Header>
            {/* SearchField component */}
            <SearchField />
          </Header>
          
          {/* Images component */}
          <Images />
        </ImageContext.Provider>
      </AuthContext>
    </Container>
  );
}

export default App;
