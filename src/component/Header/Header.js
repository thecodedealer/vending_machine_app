import React, { useState, useEffect } from 'react'

import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import MoreIcon from '@material-ui/icons/MoreVert'

// import headerClasses from './Header.scss'


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}))


const Header = props => {
    const { location } = props
    const classes = useStyles()
    const [navName, setNavName] = useState('Home')
    const [anchorEl, setAnchorEl] = useState(null)
    const MENU_ITEMS = [{
        name: 'Home',
        link: '/',
    }, {
        name: 'Vending Machine',
        link: '/vending',
    }, {
        name: 'Admin',
        link: '/admin',
    }]
    useEffect(() => {
        try {
            const { name } = MENU_ITEMS.find(item => item.link === location.pathname)
            document.title = name
            setNavName(name)
        } catch  (e) {
            console.warn('Location name not defined: ' + location.pathname)
        }

    }, [location])


    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null)
    }

    function handleMenuClose() {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="Show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Home</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="Show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Vending machine</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="Account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Admin</p>
            </MenuItem>
        </Menu>
    )

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    {/*  <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Open drawer"
                    >
                        <MenuIcon/>
                    </IconButton>*/}
                    <Typography className={classes.title} variant="h6" noWrap>
                        {navName}
                    </Typography>
                    <div className={classes.grow}/>

                    {/* MENU ITEMS */}
                    {MENU_ITEMS.map(item => (
                        <div key={item.name} className={classes.sectionDesktop}>
                            <NavLink to={item.link} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                <Button color="inherit">{item.name}</Button>
                            </NavLink>
                        </div>
                    ))}

                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}

export default Header
