import React from 'react';

import { UploadProvider } from './UploadProvider';

function AppProvider(props) {
  return <UploadProvider>{props.children}</UploadProvider>;
}

export default AppProvider;
