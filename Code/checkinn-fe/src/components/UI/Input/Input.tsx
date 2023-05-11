import React, { useState, CSSProperties, FC, HTMLInputTypeAttribute, ReactNode } from 'react';
import styles from './Input.module.css';
import { OverridableStringUnion } from '@mui/types/index';
import { TextField, TextFieldPropsSizeOverrides } from '@mui/material';

interface InputProps {
  children?: ReactNode;
  label?: string;
  helperText?: ReactNode;
  errorHelperText?: ReactNode;
  style?: CSSProperties;
  type: HTMLInputTypeAttribute | undefined;
  name?: string | undefined;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides> | undefined;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  value?: unknown;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  multiline?: boolean;
  required?: boolean;
  initialFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  select?: boolean;
}

const Input: FC<InputProps> = ({
  children,
  label,
  helperText,
  errorHelperText,
  style,
  type,
  name,
  startAdornment,
  endAdornment,
  value,
  onBlur,
  onFocus,
  onChange,
  size = 'small',
  multiline = false,
  required = false,
  initialFocus = false,
  disabled = false,
  select = false,
  error = false,
}) => {
  const [focused, setFocused] = useState(initialFocus);

  const onFocusHandler = () => setFocused((focus) => !focus);

  return (
    <TextField
      type={type}
      name={name}
      multiline={multiline}
      required={required}
      disabled={disabled}
      error={error}
      focused={focused}
      variant='outlined'
      label={label}
      helperText={error ? errorHelperText : helperText}
      style={style}
      className={styles.passwordInput}
      select={select}
      value={value}
      onChange={onChange}
      onFocus={(event) => {
        onFocus && onFocus(event);
        onFocusHandler();
      }}
      onBlur={(event) => {
        onBlur && onBlur(event);
        onFocusHandler();
      }}
      size={size}
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
    >
      {children}
    </TextField>
  );
};

export default Input;
