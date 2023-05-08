import React, { CSSProperties, FC } from 'react';
import styles from './Input.module.css';

interface InputProps {
  style?: CSSProperties;
  type: string;
}

const Input: FC<InputProps> = (style, type, ...porps) => {
  return <input type={type} className={styles.passwordInput} />;
};

export default Input;
