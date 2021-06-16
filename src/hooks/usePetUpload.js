import { useContext } from 'react';
import { UploadPetContext } from '../providers/UploadPetProvider';

export function usePetUpload() {
  const context = useContext(UploadPetContext);

  return context;
}
