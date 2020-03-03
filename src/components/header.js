import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useContext } from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';

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
            // marginLeft: theme.spacing(3),
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

}));

export function useRouter() {
    return useContext(RouterContext);
}

export default function PrimarySearchAppBar(props) {
    const { history } = useRouter();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const [value, setValue] = React.useState(null);
    const [isCurrentTab, setCurrentTab] = React.useState({
        'profile': false,
        'list': false,
        'create': false
    });
    const [auth, setAuth] = React.useState(false);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        if (newValue === 0) {
            history.push('/profile');
        }
        if (newValue === 1) {
            history.push('/employees');
        }
        if (newValue === 2) {
            history.push('/employee/create');
        }
    };

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        history.push('/profile');
    };

    const handleLogOut = () => {
        window.sessionStorage.clear();
        history.push('/home');
    };

    const handleGoBack = () => {
        history.goBack();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        if (JSON.parse(window.sessionStorage.getItem("user")) != null) {
            var auth_check = JSON.parse(window.sessionStorage.getItem("user")).role;
            if (auth_check === 1) {
                setAuth(true);
            }
            else {
                history.push('/404');
            }
        }
        else {
            history.push('/404');
        }

        let path_page = window.location.pathname;
        if (path_page === '/profile') {
            setCurrentTab({
                'profile': true,
                'list': false,
                'create': false
            });
            setValue(0);
        }
        if (path_page === '/employees') {
            setCurrentTab({
                'profile': false,
                'list': true,
                'create': false
            });
            setValue(1);
        }
        if (path_page === '/employee/create') {
            setCurrentTab({
                'profile': false,
                'list': false,
                'create': true
            });
            setValue(2);
        }
    }, [history])

    const menuId = 'primary-search-account-menu';
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
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" style={{ width: `calc(100% - ${props.drawerWidth}px)`, marginLeft: props.drawerWidth, }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleGoBack}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Employee Management System
                    </Typography>
                    {auth && (
                        <Tabs
                            value={value}
                            // indicatorColor="primary"
                            onChange={handleChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab label="Profile" style={{fontSize: '1.00rem', fontFamily: 'Arial', fontWeight: 'bold', color: 'white'}} disabled={isCurrentTab.profile} />
                            <Tab label="Employee List" style={{fontSize: '1.00rem', fontFamily: 'Arial', fontWeight: 'bold', color: 'white'}} disabled={isCurrentTab.list} />
                            <Tab label="Create Employee" style={{fontSize: '1.00rem', fontFamily: 'Arial', fontWeight: 'bold', color: 'white'}} disabled={isCurrentTab.create} />
                        </Tabs>
                    )}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            style={{
                                border: '2px solid white',
                                borderRadius: '10px',
                                padding: '4px',
                                backgroundColor: '#f4f4f4',
                                color: 'black',
                                fontSize: '16px',
                            }}
                        >
                            {props.username}&nbsp;
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}