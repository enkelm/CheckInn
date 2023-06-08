import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  AlertPropsVariantOverrides,
  AlertTitle,
  Collapse,
} from '@mui/material';
import type { OverridableStringUnion } from '@mui/types/index';
import React, { ReactNode, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { toggleAlert } from '../../../store/ui-slice';

export interface ToastAlertProps {
  children: ReactNode;
  title: ReactNode;
  severity: AlertColor | undefined;
  variant?:
    | OverridableStringUnion<'standard' | 'filled' | 'outlined', AlertPropsVariantOverrides>
    | undefined;
  color?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
  action?: ReactNode;
}

export interface CAlertProps extends ToastAlertProps {
  onClose?: ((event: React.SyntheticEvent<Element, Event>) => void) | undefined;
}

const CAlert = forwardRef<HTMLDivElement, CAlertProps>(function CAlert(
  { children, title, severity, variant = 'outlined', color, action, onClose },
  ref,
) {
  const alertIsActive = useAppSelector((state) => state.ui.alert);
  const dispatch = useAppDispatch();

  return (
    <Collapse in={alertIsActive} ref={ref}>
      <Alert
        severity={severity}
        variant={variant}
        color={color}
        action={action}
        onClose={(event) => {
          dispatch(toggleAlert());
          onClose && onClose(event);
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </Collapse>
  );
});

export const ToastAlert = forwardRef<HTMLDivElement, ToastAlertProps>(function CAlert(
  { children, title, severity, variant = 'filled', color, action },
  ref,
) {
  return (
    <Alert ref={ref} severity={severity} variant={variant} color={color} action={action}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
});

export default CAlert;
