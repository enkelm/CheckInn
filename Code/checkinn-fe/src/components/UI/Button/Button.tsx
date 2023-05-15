import React, { FC } from 'react';
import { ButtonPropsVariantOverrides, ButtonPropsSizeOverrides } from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import type { OverridableStringUnion } from '@mui/types/index';
import type { SxProps } from '@mui/system/styleFunctionSx';
import type { Theme } from '@mui/material/styles/createTheme';
import { useAppSelector } from '../../../hooks/hooks';

interface CButtonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme> | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: OverridableStringUnion<'text' | 'contained' | 'outlined', ButtonPropsVariantOverrides>;
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>;
  disabled?: boolean;
  href?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CButton: FC<CButtonProps> = ({
  children,
  sx,
  type = 'button',
  variant = 'contained',
  disabled,
  size,
  href,
  startIcon,
  endIcon,
  onClick,
}) => {
  const isLoading = useAppSelector((state) => state.ui.loading);

  return (
    <LoadingButton
      sx={sx}
      type={type}
      variant={variant}
      size={size}
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
