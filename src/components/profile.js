import React from 'react';
import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/icons/Close';
import ActionHome from '@material-ui/icons/Close';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Container from '@material-ui/core/Container';
import BellIcon from 'react-bell-icon';
import SendIcon from '@material-ui/icons/Send';
import { useContext } from 'react';
import {
    useParams
} from "react-router-dom";
import { __RouterContext as RouterContext } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
import { Chart } from 'react-charts'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    root: {

    },
    snackbar: {
        height: 100,
        backgroundColor: '#4caf50',
        fontWeight: 500,
        alignContent: 'left',
    },
    contenButton: {
        fontWeight: 'bold',
        fontSize: '20px',
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
        color: 'white',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    largeIcon: {
        width: '100',
        height: '100',
        position: 'absolute',
        bottom: '5%',
        left: '2%',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const useStylesGrid = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    paper: {
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 35,
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
        fontFamily: 'Roboto',
        color: '#34495e',
    },
    clock: {
        fontWeight: 'bold',
        fontSize: '32px',
        color: '#34495e',
    },
}));

const working_emp = {
    username: 'phuocnd',
    fullName: 'Nguyen Duc Phuoc',
    day_working_actual: 21,
    day_checked: 15,
    working_hour: 120,
    off_hour: 16
}

export default function Profile() {
    const queueRef = React.useRef([]);
    const [open, setOpen] = React.useState(true);
    const [clock, setClock] = React.useState(new Date().toLocaleString());
    const [stateLockIn, setStateLockIn] = React.useState('enable');
    const [stateLockOut, setStateLockOut] = React.useState('enable');
    const classes = useStyles();
    const classesGrid = useStylesGrid();

    React.useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const clickClockIn = () => {
        setStateLockIn('disable');
    }

    const clickClockOut = () => {
        setStateLockOut('disable');
    }

    function tick() {
        setClock(new Date().toLocaleString());
    }

    const data = React.useMemo(
        () => [
            {
                label: 'Working hours',
                data: [['January', 168], ['February', 150], ['March', 160], ['April', 0], ['May', 0], ['July', 0], ['June', 0], ['August', 0], ['September', 0], ['October', 0], ['November', 0], ['December', 0]]
            },
            {
                label: 'Off hours',
                data: [['January', 128], ['February', 168], ['March', 120], ['April', 0], ['May', 0], ['July', 0], ['June', 0], ['August', 0], ['September', 0], ['October', 0], ['November', 0], ['December', 0]]
            },
        ],
        []
    )

    const series = React.useMemo(
        () => ({
            type: 'bar'
        }),
        []
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { position: 'left', type: 'linear', stacked: false }
        ],
        []
    )

    return (
        <div className={classes.root}>
            <div className={classesGrid.root}>
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid className={classesGrid.clock} item xs={3}>
                        <BellIcon width='50' height="50" active={true} animate={true} color='#4caf50' />
                        <span> </span>{clock}
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<CheckCircleOutlineIcon clickClockIn/>}
                            >
                                {'CLOCK-IN !!!'}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                endIcon={<CheckCircleOutlineIcon clickClockOut/>}
                            >
                                {'CLOCK-OUT !!!'}   
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div className={classesGrid.title}>Thông tin cá nhân</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            USERNAME:
                                        </TableCell>
                                        <TableCell align="left">{working_emp.username}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            FULL NAME:
                                        </TableCell>
                                        <TableCell align="left">{working_emp.fullName}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            ACTUAL WORKING DAY:
                                        </TableCell>
                                        <TableCell align="left">{working_emp.day_checked}/{working_emp.day_working_actual} (days)</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            ACTUAL WORKING HOUR:
                                        </TableCell>
                                        <TableCell align="left">{working_emp.working_hour}/{working_emp.day_working_actual * 8} (hours)</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            HOURS OFF:
                                        </TableCell>
                                        <TableCell align="left">{working_emp.off_hour} (hours)</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Paper>
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div className={classesGrid.title}>Chart</div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div style={{
                                width: '1000px',
                                height: '400px',
                            }}>
                                <Chart data={data} series={series} axes={axes} tooltip />
                            </div>
                        </Grid>

                    </Grid>
                </Paper>
            </div>
        </div>
    );
}