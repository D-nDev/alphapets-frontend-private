import { useContext } from 'react';
import { UploadContext } from '../providers/UploadProvider';

export function useUpload() {
  const context = useContext(UploadContext);

  return context;
}
