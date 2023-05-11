import { Modal } from '@mui/material';
import React, { FC, JSXElementConstructor, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { toggleModal } from '../../../store/ui-slice';

interface ModalProps {
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  type: ModalTypes;
  onClose?: ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined;
}

export type ModalTypes = 'loginModal' | 'signupModal';

const CModal: FC<ModalProps> = ({ children, type, onClose }) => {
  const modalIsVisible = useAppSelector((state) => state.ui.modalIsVisible[type]);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={modalIsVisible}
      onClose={(event, reason) => {
        onClose && onClose(event, reason);
        dispatch(toggleModal(type));
      }}
    >
      {children}
    </Modal>
  );
};

export default CModal;
