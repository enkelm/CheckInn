import React, { Children, FC } from 'react';
import Button, { ButtonPropsVariantOverrides } from '@mui/material/Button';
import type { OverridableStringUnion } from '@mui/types/index';
import styles from './Button.module.css';

interface CButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: OverridableStringUnion<'text' | 'contained' | 'outlined', ButtonPropsVariantOverrides>;
  disabled?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CButton: FC<CButtonProps> = ({
  children,
  type = 'button',
  variant = 'contained',
  disabled,
  href,
  onClick,
}) => {
  return (
    <Button type={type} variant={variant} disabled={disabled} href={href} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CButton;
