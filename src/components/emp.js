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
import axios from 'axios';

export function useRouter() {
    return useContext(RouterContext);
}

const useStylesBar = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: "5%",
        marginBottom: 25,
        marginLeft: "5%",
        marginRight: "5%",
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
}));

const useStylesGrid = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
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

    const [data, setDataEmp] = React.useState({});

    React.useEffect(() => {
        console.log(`/api/employees/` + id);
        axios.get(`/api/employees/` + id)
            .then(res => {
                const data_emp = res.data;
                console.log(data_emp);
                setDataEmp(data_emp);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div className={classesBar.root}>
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
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            ID:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.id}</TableCell>
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            USERNAME:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.emp_code}</TableCell>
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            NAME:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.emp_name}</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            GENDER:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.gender}</TableCell>
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            BIRTHDAY:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.dob}</TableCell>
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
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            ADDRESS:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.address}</TableCell>
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            IDENTIFICATION CARD:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.identification_card}</TableCell>
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            PHONE NUMBER:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.phone_number}</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            ROOM:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.emp_department}</TableCell>
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            POSITION:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.emp_title}</TableCell>
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            HIRE DATE:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.date_join}</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell width={'16.67%'} className={classesGrid.nameField} component="th" scope="row">
                                            LEFT DATE:
                                        </TableCell>
                                        <TableCell width={'16.67%'} align="left">{data.date_left}</TableCell>
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