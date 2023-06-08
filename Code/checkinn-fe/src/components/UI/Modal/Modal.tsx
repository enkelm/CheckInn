import { Modal } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { toggleAlert, toggleModal } from '../../../store/ui-slice';
import CCard from '../Card/Card';
import { SxProps, Theme } from '@mui/material/styles';
import styled from '@emotion/styled';

interface ModalProps {
  children: ReactNode;
  type: ModalTypes;
  sx?: SxProps<Theme> | undefined;
  title?: ReactNode;
  onClose?: ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined;
}

export type ModalTypes = 'loginModal' | 'signupModal' | 'createListingModal';

const Card = styled(CCard)({
  position: 'absolute',
  top: '50%',
  right: '50%',
  transform: 'translate(50%, -50%)',
  minWidth: '30vw',
  padding: '2rem',
});

const CModal: FC<ModalProps> = ({ children, type, sx, title, onClose }) => {
  const modalIsVisible = useAppSelector((state) => state.ui.modalIsVisible[type]);
  const alertIsVisible = useAppSelector((state) => state.ui.alert);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={modalIsVisible}
      onClose={(event, reason) => {
        onClose && onClose(event, reason);
        alertIsVisible && dispatch(toggleAlert());
        dispatch(toggleModal(type));
      }}
    >
      <Card title={title} sx={sx}>
        {children}
      </Card>
    </Modal>
  );
};

export default CModal;
