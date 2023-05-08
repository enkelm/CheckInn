import React, { CSSProperties, FC, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  style?: CSSProperties;
  children?: ReactNode;
}

const Card: FC<CardProps> = ({ style, children }) => {
  return (
    <div style={style} className={styles.card}>
      {children}
    </div>
  );
};

export default Card;
