import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const pages = ['TV Shows'];
const settings = ['Add Media', 'Log Out'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useSelector((state) => state.auth);

  const isLoggedIn = !!auth.id;
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (destination) => {
    setAnchorElNav(null);
    navigate(destination);
  };

  const handleCloseUserMenu = (destination) => {
    setAnchorElUser(null);
    navigate(destination);
  };

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: '#133353' }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <RoomServiceIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />

            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              JumpScare
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu(page.split(' ').join(''));
                    }}
                  >
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <RoomServiceIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              JumpScare
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu(page.split(' ').join(''));
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, borderWidth: 'medium' }}
                  >
                    <Avatar
                      alt={auth.username}
                      src={auth.profilePic}
                      sx={{
                        border: '1px solid lightgray',
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu(setting.split(' ').join(''));
                      }}
                    >
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button
                onClick={() => {
                  navigate('/signin');
                }}
              >
                {' '}
                Login{' '}
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Header;
