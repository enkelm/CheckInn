import { Modal } from '@mui/material';
import React, { FC, JSXElementConstructor, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { toggleModal } from '../../../store/ui-slice';

interface ModalProps {
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  onClose?: ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined;
}

const CModal: FC<ModalProps> = ({ children, onClose }) => {
  const modalIsVisible = useAppSelector((state) => state.ui.modalIsVisible);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={modalIsVisible}
      onClose={(event, reason) => {
        onClose && onClose(event, reason);
        dispatch(toggleModal());
      }}
    >
      {children}
    </Modal>
  );
};

export default CModal;
