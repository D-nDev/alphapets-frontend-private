import React, { createContext, useState } from 'react';
import api from '../services/api';
import backendapi from '../services/backendapi';
import { useCookies } from '../hooks/useCookies';

export const UploadContext = createContext({});

export const UploadProvider = props => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState([]);
  const { cookies } = useCookies();
  const acceptedFiles = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/svg',
    'image/svg+xml',
  ];
  const fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    if (acceptedFiles.includes(selectedFile.type)) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', process.env.REACT_APP_API_KEY);
      try {
        const { data } = await api.post('/image/upload', formData, {
          onUploadProgress: () => {
            setLoading('Fazendo upload...');
          },
        });
        setLoading('Upload realizado com sucesso');
        console.log(data.url);
        const body = {
          email: cookies.get('email'),
          link: data.url,
        };
        // eslint-disable-next-line no-unused-vars
        const { newdata } = await backendapi.post('/setphoto', body);
        localStorage.setItem('@alphapets:photo', data.url);
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoading('Erro, formato de imagem não aceito');
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
