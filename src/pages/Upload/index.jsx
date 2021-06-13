import React from 'react';
import { useUpload } from '../../hooks/useUpload';

// import { Container } from './styles';

function Upload() {
  const { fileSelectedHandler, fileUploadHandler, loading } = useUpload();
  return (
    <>
      <input
        type="file"
        onChange={fileSelectedHandler}
        accept=".jpg,.png,.jpeg,.svg,.bmp"
      />
      <button type="submit" onClick={fileUploadHandler}>
        Upload
      </button>

      <p>{loading}</p>
    </>
  );
}

export default Upload;
