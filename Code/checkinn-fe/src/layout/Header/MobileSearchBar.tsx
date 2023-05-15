import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Header.module.css';

const MobileSearchBar = () => {
  return (
    <div className={styles.mobileSearchBar}>
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '80%',
          border: '1px solid #ccc',
          borderRadius: 20,
        }}
      >
        <IconButton sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder='Where to?' />
        <IconButton sx={{ p: '10px' }}>
          <TuneIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default MobileSearchBar;
