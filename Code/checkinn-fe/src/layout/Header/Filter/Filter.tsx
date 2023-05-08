import React, { FC, Dispatch, SetStateAction } from 'react';
import { links } from '../../../assests/image-links';
import styles from './Filter.module.css';

interface FilterProps {
  selectedFilter: number;
  setSelectedFilter: Dispatch<SetStateAction<number>>;
}

const Filter: FC<FilterProps> = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <div className={styles.filterDiv}>
      {links.map((item, i) => (
        <div
          key={i}
          className={`${styles.linksBox} ${i == selectedFilter && styles.selectedBox}`}
          onClick={() => {
            console.log('selecting key', i);
            setSelectedFilter(i);
          }}
        >
          <img src={item.imgSrc} className={styles.linksImg} />
          <p className={`${styles.linksLabel} ${i == selectedFilter && styles.selectedLabel}`}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Filter;
