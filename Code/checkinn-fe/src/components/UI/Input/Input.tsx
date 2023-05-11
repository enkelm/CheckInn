import React, { useState, CSSProperties, FC, HTMLInputTypeAttribute, ReactNode } from 'react';
import styles from './Input.module.css';
import { OverridableStringUnion } from '@mui/types/index';
import { TextField, TextFieldPropsSizeOverrides } from '@mui/material';

interface InputProps {
  children?: ReactNode;
  label?: string;
  helperText?: ReactNode;
  style?: CSSProperties;
  type: HTMLInputTypeAttribute | undefined;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides> | undefined;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  value?: unknown;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  select?: boolean;
}

const Input: FC<InputProps> = ({
  children,
  label,
  helperText,
  style,
  type,
  startAdornment,
  endAdornment,
  value,
  onBlur,
  onFocus,
  onChange,
  size = 'small',
  multiline = false,
  required = false,
  disabled = false,
  select = false,
  error = false,
}) => {
  const [focused, setFocused] = useState(false);

  const onFocusHandler = () => setFocused((focus) => !focus);

  return (
    <TextField
      type={type}
      multiline={multiline}
      required={required}
      disabled={disabled}
      focused={focused}
      error={error}
      variant='outlined'
      label={label}
      helperText={helperText}
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
