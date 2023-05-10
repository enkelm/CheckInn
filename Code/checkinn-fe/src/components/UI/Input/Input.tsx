import React, { useState, CSSProperties, FC, HTMLInputTypeAttribute, ReactNode } from 'react';
import styles from './Input.module.css';
import { TextField } from '@mui/material';

interface InputProps {
  label?: string;
  style?: CSSProperties;
  type: HTMLInputTypeAttribute | undefined;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  value?: unknown;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  multiline?: boolean;
  required?: boolean;
  error?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  style,
  type,
  startAdornment,
  endAdornment,
  value,
  onChange,
  multiline = false,
  required = false,
  error = false,
}) => {
  const [focused, setFocused] = useState(false);

  const onFocusHandler = () => setFocused((focus) => !focus);

  return (
    <TextField
      multiline={multiline}
      required={required}
      focused={focused}
      error={error}
      variant='outlined'
      label={label}
      style={style}
      type={type}
      className={styles.passwordInput}
      value={value}
      onChange={onChange}
      onFocus={onFocusHandler}
      onBlur={onFocusHandler}
      size='small'
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
    />
  );
};

export default Input;
