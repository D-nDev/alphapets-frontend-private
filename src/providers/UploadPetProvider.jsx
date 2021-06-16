import React, { createContext, useState } from 'react';
import api from '../services/api';

export const UploadPetContext = createContext({});

export const UploadPetProvider = props => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState([]);
  const [photourl, setPhotoUrl] = useState('');
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
        setPhotoUrl(data.url);
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoading('Erro, formato de imagem não aceito');
    }
  };

  return (
    <UploadPetContext.Provider
      value={{
        UploadPetProvider,
        fileSelectedHandler,
        fileUploadHandler,
        selectedFile,
        setLoading,
        loading,
        setPhotoUrl,
        photourl,
      }}
    >
      {props.children}
    </UploadPetContext.Provider>
  );
};
