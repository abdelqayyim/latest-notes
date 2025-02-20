import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Icons from './icons/Icons';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { toggleView, VIEW_TYPE, TABS, setTab, setSearchString } from '../redux/uiSlice';
import { logout } from '../redux/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPageNotFound } from '../redux/dataSlice';
function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const naviagate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState('');
    const user = useSelector((state) => state.authentication);
    const displayType = useSelector((state) => state.ui.view);
    const currentTab = useSelector((state) => state.ui.currentTab);

    const pages = ["View", ...Object.values(TABS).map(tab => 
        tab),
        ...(user.isAdmin ? ["All"] : [])
    ];
    const settings = [{
        label: "Settings",
        onAction: ()=>{}
    }, {
        label: 'Logout',
        onAction: ()=> {dispatch(logout());}
    }];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
    function capitalizeName(name) {
      if (!name) {
          return "";
      }
    return name
      .toLowerCase() // Convert the whole string to lowercase first
      .split(' ') // Split by spaces to handle multiple words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
      .join(' '); // Join words back into a string
  }

  const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      dispatch(setSearchString(event.target.value))
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search Query:', searchQuery);
    // Add your search logic here
  };
  const handleNavBarClick = (page) => {
    if (page !== "View") {
      dispatch(setTab(page))
    }
    if (location.pathname !== "/") {
      naviagate("/")
    }
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left-aligned pages */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => { handleCloseNavMenu(); handleNavBarClick(page); dispatch(setPageNotFound(false)) }}
                    sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                        backgroundColor: currentTab === page ? "rgb(94,99,255)": "transparent",
                        '&:hover': {
                            // backgroundColor: 'rgb(94,99,255)', // Light background on hover
                            transform: 'scale(1.05)', // Slightly scale up on hover
                        },
                    }}
              >
                {page === 'View' ? (
                        <Box
                            onClick={() => { dispatch(toggleView()) }}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}
                  >
                    {displayType === VIEW_TYPE.GRID ? Icons.TABLE_VIEW : Icons.GRID_VIEW}
                  </Box>
                ) : (
                  page
                )}
              </Button>
            ))}
          </Box>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 2 }}>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                variant="outlined"
                placeholder="Search…"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Box>

          {/* Right-aligned user menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={capitalizeName(user?.firstName)} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={()=>{handleCloseUserMenu(); setting.onAction()}}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;