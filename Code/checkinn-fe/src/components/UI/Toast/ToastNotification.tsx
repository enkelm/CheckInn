import React, { FC, ReactElement } from 'react';
import { Slide, SlideProps, Snackbar, SnackbarCloseReason } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { toggleToast } from '../../../store/ui-slice';
import { ToastAlertProps } from '../Alerts/Alert';

interface ToastNotifProps {
  children: ReactElement<FC<ToastAlertProps>>;
  autoHide?: number | undefined;
  onClose?: (event: React.SyntheticEvent<unknown> | Event, reason: SnackbarCloseReason) => void;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='up' />;
}

const ToastNotification: FC<ToastNotifProps> = ({ children, autoHide = 3000, onClose }) => {
  const toastIsActive = useAppSelector((state) => state.ui.toast);
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      open={toastIsActive}
      autoHideDuration={autoHide}
      TransitionComponent={SlideTransition}
      onClose={(event, reason) => {
        onClose && onClose(event, reason);
        if (reason === 'clickaway') {
          return;
        }

        dispatch(toggleToast());
      }}
    >
      {children}
    </Snackbar>
  );
};

export default ToastNotification;
