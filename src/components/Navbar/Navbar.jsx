import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography, Badge, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectUserEmail, setUserLoginDetails } from '../../features/userSlice';

const Navbar = ({ open, setOpen }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const userEmail = useSelector(selectUserEmail);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (text) => {
        setAnchorElNav(null);
    };

    const logout = () => {
        setOpen({ show: true, type: "success", message: "Logout Successfull" });
        dispatch(setUserLoginDetails({
            name: null,
            email: null,
            _id: null
        }))
        Cookies.remove("user")
        navigate(0)
    }

    useEffect(() => {
        setUserInfo(Cookies?.get('user') ? JSON?.parse(Cookies?.get('user')) : null);
    }, [])
    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    fontSize: { md: "1.5rem" },
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Micro Social Media
                            </Typography>
                        </Link>
                        {userInfo?.useremail || userEmail ?
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
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
                                        textTransform: "initial"
                                    }}
                                >
                                    <MenuItem onClick={logout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>

                                </Menu>

                            </Box> : <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
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
                                        textTransform: "initial"
                                    }}
                                >
                                    <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Login</Typography>
                                        </MenuItem>
                                    </Link>
                                    <Link to="/register" style={{ textDecoration: "none", color: 'inherit' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Register</Typography>
                                        </MenuItem>
                                    </Link>
                                </Menu>
                            </Box>}
                        <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 8,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontWeight: 700,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Micro Social Media
                            </Typography>
                        </Link>
                        {userInfo?.useremail || userEmail ?
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "flex-end" } }}>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={4} color="error">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={17} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <Button
                                    onClick={logout}
                                    sx={{ my: 2, display: { xs: 'none', md: 'flex' }, color: 'white', textTransform: "initial" }}
                                >
                                    Logout
                                </Button>
                            </Box> : <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "flex-end" } }}>
                                <Link to="/register" style={{ textDecoration: "none", color: 'inherit' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block', textTransform: "initial" }}
                                    >
                                        Register
                                    </Button>
                                </Link>
                                <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block', textTransform: "initial" }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                            </Box>}
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar