import { TextField, TextFieldProps } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IValidationInput
  extends Omit<TextFieldProps, 'name' | 'defaultValue' | 'render'> {
  name: string;
}

const ValidationInput: React.FC<IValidationInput> = ({
  name,
  ...textFieldProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...textFieldProps}
          error={!!error}
          helperText={error ? error.message : ''}
        />
      )}
    />
  );
};

export default ValidationInput;
