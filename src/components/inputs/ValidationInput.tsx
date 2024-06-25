import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
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

  const error = errors[name];
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          {...textFieldProps}
          error={!!error}
          helperText={error?.message?.toString() ?? ''}
        />
      )}
    />
  );
};

export default ValidationInput;
