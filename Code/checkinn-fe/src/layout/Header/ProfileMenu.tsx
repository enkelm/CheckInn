import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { PopoverProps } from '@mui/material/Popover';
import styles from './Header.module.css';
import { useAppDispatch } from '../../hooks/hooks';
import { uiActions } from '../../store/ui-slice';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<PopoverProps['anchorEl']>();
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <div>
      <div
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={styles.profileMenu}
      >
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '.MuiPaper-root': {
            minWidth: '200px',
            borderRadius: '1rem',
            boxShadow: '0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)',
          },
        }}
      >
        <MenuItem className={styles.menuItems} onClick={handleClose}>
          Signup
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          className={styles.menuItems}
          onClickCapture={() => dispatch(uiActions.toggleModal())}
        >
          Login
        </MenuItem>
        <div
          style={{
            height: '1px',
            backgroundColor: 'var(--grey)',
            width: '100%',
          }}
        />
        <MenuItem onClick={handleClose} className={styles.menuItems}>
          Airbnb Your Home
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuItems}>
          Host an experience
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuItems}>
          Help
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
