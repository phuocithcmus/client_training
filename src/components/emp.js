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
import PrimarySearchAppBar from './header'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import AddBoxIcon from '@material-ui/icons/AddBox';

export function useRouter() {
    return useContext(RouterContext);
}

const useStylesBar = makeStyles(theme => ({
    root: {
        flexGrow: 1,
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
        marginTop: "5%",
        marginBottom: 25,
        marginLeft: "5%",
        marginRight: "5%",
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    paper: {
        marginTop: 10,
        marginBottom: 10,
        padding: theme.spacing(2),
        border: '1px solid #BDBDBD',
        backgroundColor: '#F5F5F5',
        marginLeft: "5px",
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

const drawerWidth = 240;
const useStylesSide = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
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
    const classesSide = useStylesSide();
    const [auth, setAuth] = React.useState(false);

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
        if(JSON.parse(window.sessionStorage.getItem("user")) != null){
            var auth_check = JSON.parse(window.sessionStorage.getItem("user")).role;
            if (auth_check == 1) {
                setAuth(true);
            }
            else {
                history.push('/404');
            }
        }
        else {
            history.push('/404');
        }
        console.log(`/api/employees/` + id);
        axios.get(`/api/employees/` + id)
            .then(res => {
                const data_emp = res.data;
                console.log(data_emp);
                setDataEmp(data_emp);
            })
            .catch(error => {
                history.push('/404');
            });
    }, [])

    return (
        <div className={classesBar.root}>
            <PrimarySearchAppBar username={JSON.parse(window.sessionStorage.getItem("user")).emp_code} drawerWidth={240} />
            <Drawer
                className={classesSide.drawer}
                variant="permanent"
                classes={{
                    paper: classesSide.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classesSide.toolbar} />
                <Divider />
                <List>

                <ListItem button onClick={() => {history.push('/employees')}} key='List Employee'>
                                <ListItemIcon><ListIcon/></ListItemIcon>
                                <ListItemText primary='List Employee' />
                            </ListItem>
                            <ListItem button onClick={() => {history.push('/employee/create')}} key='Create Employee'>
                                <ListItemIcon><AddBoxIcon/></ListItemIcon>
                                <ListItemText primary='Create Employee' />
                            </ListItem>
                </List>
            </Drawer>
            <div className={classesGrid.root}>
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div className={classesGrid.title}>Employee Information</div>
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
                            <div className={classesGrid.title}>Contact Information</div>
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