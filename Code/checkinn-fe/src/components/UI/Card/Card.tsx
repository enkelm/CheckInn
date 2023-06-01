import React, { FC, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import styles from './Card.module.css';
import { Card, Box } from '@mui/material';
import { flexCenter } from '../../../assests/common-styles';

interface CardProps {
  className?: string;
  children?: ReactNode;
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
  sx?: SxProps<Theme> | undefined;
  title?: ReactNode;
}

const CCard: FC<CardProps> = ({ sx, className, children, title, ref }) => {
  return (
    <Card sx={sx} ref={ref} className={`${styles.card} ${className ? className : ''}`}>
      {title && (
        <Box
          sx={{
            ...flexCenter,
            width: '100%',
            fontWeight: '500',
            marginBottom: '2rem',
          }}
        >
          {title}
        </Box>
      )}
      {children}
    </Card>
  );
};

export default CCard;
