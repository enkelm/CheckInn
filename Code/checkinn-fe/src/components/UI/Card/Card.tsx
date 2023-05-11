import React, { CSSProperties, FC, ReactNode } from 'react';
import styles from './Card.module.css';
import { Card } from '@mui/material';

interface CardProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
}

const CCard: FC<CardProps> = ({ style, className, children, ref }) => {
  return (
    <Card ref={ref} style={style} className={`${styles.card} ${className ? className : ''}`}>
      {children}
    </Card>
  );
};

export default CCard;
