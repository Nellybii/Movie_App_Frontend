import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movie Store
        </Typography>
        <Button component={Link} to="/" color="inherit">HOME</Button>
        {isLoggedIn ? (
          <>
            <Button component={Link} to="/movies" color="inherit">Movies</Button>
            <Button component={Link} to="/cart" color="inherit">Cart</Button>
            
            {isAdmin && (
              <Button component={Link} to="/movieform" color="inherit">Movie Form</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/register" color="inherit">SignUp</Button>
            <Button component={Link} to="/login" color="inherit">Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
