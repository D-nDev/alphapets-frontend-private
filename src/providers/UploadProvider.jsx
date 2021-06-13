import React, { createContext, useState } from 'react';
import api from '../services/api';

export const UploadContext = createContext({});

export const UploadProvider = props => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState([]);
  const fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', process.env.REACT_APP_API_KEY);
    try {
      const { data } = await api.post('/image/upload', formData, {
        onUploadProgress: () => {
          setLoading('Loading...');
        },
      });
      setLoading('Upload ok');
      console.log(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UploadContext.Provider
      value={{
        UploadProvider,
        fileSelectedHandler,
        fileUploadHandler,
        selectedFile,
        setLoading,
        loading,
      }}
    >
      {props.children}
    </UploadContext.Provider>
  );
};
