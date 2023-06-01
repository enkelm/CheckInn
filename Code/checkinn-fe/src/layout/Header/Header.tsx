import React, { useCallback } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { toggleModal } from '../../store/ui-slice';
import CreateListing from '../../features/CreateListing/CreateListing';

const Header = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateListingModal = useCallback(() => {
    user?.token ? dispatch(toggleModal('createListingModal')) : dispatch(toggleModal('loginModal'));
  }, [user.token]);

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
        <div className={styles.listYourself} onClick={handleCreateListingModal}>
          List your property
        </div>
        <CreateListing />
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
