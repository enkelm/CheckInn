import React, { CSSProperties, FC, ReactNode } from 'react';
import styles from './Card.module.css';
import { Card } from '@mui/material';

interface CardProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const CCard: FC<CardProps> = ({ style, className, children }) => {
  return (
    <Card style={style} className={`${styles.card} ${className ? className : ''}`}>
      {children}
    </Card>
  );
};

export default CCard;
