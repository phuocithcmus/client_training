import React from 'react';
import { useContext } from 'react';
import {
    useParams
} from "react-router-dom";
import { __RouterContext as RouterContext } from 'react-router';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export function useRouter() {
    return useContext(RouterContext);
}

const useStylesBar = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 25,
        marginBottom: 25,
        marginLeft: 35,
        marginRight: 35,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 15,
        flexGrow: 1,
    },
    paper: {

        padding: theme.spacing(2),
    },
}));

const useStylesGrid = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        marginTop: 35
    },
    paper: {
        marginTop: 10,
        marginBottom: 10,
        padding: theme.spacing(2),
        border: '1px solid #BDBDBD',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '24px',
        fontFamily: 'Roboto',
        color: '#34495e',
    },
    nameField: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#34495e',
    },
}));

export default function Employee() {
    const classesBar = useStylesBar();
    const { history } = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let { id } = useParams();
    const classes = useStyles();
    const classesGrid = useStylesGrid();

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const employee = {
        id: 7,
        username: 'phuocnd',
        name: 'nguyen duc phuoc',
        gender: 'Nam',
        birthdate: new Date('1974/11/15'),
        hiredate: new Date('2005/05/11'),
        leftdate: '',
        address: '4600 N Virginia Rd.',
        icard: '123456789',
        room: 'room 1',
        phone: '0123456789',
        position: 'Controller',
    };

    return (
        <div className={classesBar.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classesBar.title}>
                        Employee {id}
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classesGrid.root}>
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div className={classesGrid.title}>Thông tin nhân viên</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            ID:
                                        </TableCell>
                                        <TableCell align="left">{employee.id}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            USERNAME:
                                        </TableCell>
                                        <TableCell align="left">{employee.username}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            NAME:
                                        </TableCell>
                                        <TableCell align="left">{employee.name}</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            GENDER:
                                        </TableCell>
                                        <TableCell align="left">{employee.gender}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            BIRTHDAY:
                                        </TableCell>
                                        <TableCell align="left">{employee.birthdate.toDateString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Paper>
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div className={classesGrid.title}>Thông tin liên lạc</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            ADDRESS:
                                        </TableCell>
                                        <TableCell align="left">{employee.address}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            IDENTIFICATION CARD:
                                        </TableCell>
                                        <TableCell align="left">{employee.icard}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            PHONE NUMBER:
                                        </TableCell>
                                        <TableCell align="left">{employee.phone}</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            ROOM:
                                        </TableCell>
                                        <TableCell align="left">{employee.room}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            POSITION:
                                        </TableCell>
                                        <TableCell align="left">{employee.position}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            HIRE DATE:
                                        </TableCell>
                                        <TableCell align="left">{employee.hiredate.toDateString()}</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            LEFT DATE:
                                        </TableCell>
                                        <TableCell align="left">{employee.leftdate}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Paper>
            </div>
        </div>
    )
}