import React, { FC } from 'react';
import { ButtonPropsVariantOverrides } from '@mui/material/Button';
import type { OverridableStringUnion } from '@mui/types/index';
import { useAppSelector } from '../../../hooks/hooks';
import { LoadingButton } from '@mui/lab';
// import styles from './Button.module.css';

interface CButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: OverridableStringUnion<'text' | 'contained' | 'outlined', ButtonPropsVariantOverrides>;
  disabled?: boolean;
  href?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CButton: FC<CButtonProps> = ({
  children,
  type = 'button',
  variant = 'contained',
  disabled,
  href,
  startIcon,
  endIcon,
  onClick,
}) => {
  const isLoading = useAppSelector((state) => state.ui.loading);

  return (
    <LoadingButton
      type={type}
      variant={variant}
      disabled={disabled}
      loading={isLoading}
      href={href}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {children}
    </LoadingButton>
  );
};

export default CButton;
