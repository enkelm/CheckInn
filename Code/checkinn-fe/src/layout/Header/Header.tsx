import React from 'react';
import styles from './Header.module.css';
import logo from '../../assests/logo.svg';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileMenu from './ProfileMenu';
import CustomBottomNavigation from './BottomNav';
import MobileSearchBar from './MobileSearchBar';
import Login from '../../features/authentication/Login/Login';
import Register from '../../features/authentication/Register/Register';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <img className={styles.navbarLogo} src={logo} alt='logo' onClick={() => navigate('/')} />

      <div className={styles.searchBar}>
        <div className={styles['searchBar__text']}>Any Where</div>
        <div className={styles['searchBar__text']}>Any Week</div>
        <div className={styles['searchBar__text2']}>Add Guests</div>
        <div className={styles['searchBar__iconDiv']}>
          <SearchRoundedIcon />
        </div>
      </div>

      <MobileSearchBar />

      <div className={styles.profileContainer}>
        <div className={styles.listYourself}>List your property</div>
        <div className={styles.listYourself}>
          <LanguageIcon sx={{ fontSize: '1.3rem' }} />
        </div>
        <div className={styles.profileDiv}>
          <ProfileMenu />
          <Login />
          <Register />
        </div>
      </div>
      <CustomBottomNavigation />
    </div>
  );
};

export default Header;
