import React from 'react';
// import { useField } from '@unform/core';
import { TextValidator } from 'react-material-ui-form-validator';

function Input({ name, ...props }) {
  return (
    <div>
      <TextValidator margin="normal" fullWidth {...props} />
    </div>
  );
}

export default Input;
