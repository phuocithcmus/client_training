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
import axios from 'axios';

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

function countOffDaySuitable(year, month) {

    var day, counter, date;

    day = 1;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
        if (date.getDay() === 0 || date.getDay() === 6) { // Sun=0, Mon=1, Tue=2, etc.
            counter += 1;
        }
        day += 1;
        date = new Date(year, month, day);
    }


    return new Date(year, month, 0).getDate() - counter;
}

function countOffDaySuitableToCurrentDate(year, month, current_date) {
    var day, counter, date;

    day = 1;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === month && date.getDate() < current_date) {
        if (date.getDay() === 0 || date.getDay() === 6) { // Sun=0, Mon=1, Tue=2, etc.
            counter += 1;
        }
        day += 1;
        date = new Date(year, month, day);
    }


    return new Date(year, month, current_date).getDate() - counter;
}

export default function Profile() {
    const queueRef = React.useRef([]);
    const [open, setOpen] = React.useState(true);
    const [clock, setClock] = React.useState(new Date().toLocaleString());
    const [stateLock, setStateLock] = React.useState(
        [false, false]
    );
    const [user, setUser] = React.useState(
        {id: "1", username: "phuocnd", role: "admin"}
    );
    const [emp, setEmp] = React.useState({});
    const classes = useStyles();
    const classesGrid = useStylesGrid();
    const [dataWorkingHours, setDataWorkingHours] = React.useState(
        {
            label: 'Working hours',
            data: [['January', 0], ['February', 0], ['March', 0], ['April', 0], ['May', 0], ['July', 0], ['June', 0], ['August', 0], ['September', 0], ['October', 0], ['November', 0], ['December', 0]]
        }
    );
    const [dataOffHours, setDataOffHours] = React.useState(
        {
            label: 'Off hours',
            data: [['January', 0], ['February', 0], ['March', 0], ['April', 0], ['May', 0], ['July', 0], ['June', 0], ['August', 0], ['September', 0], ['October', 0], ['November', 0], ['December', 0]]
        }
    );
    var today = new Date();

    React.useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const clickClockIn = () => {
        axios.get(`/api_working/clockIn?id=` + user.id)
            .then(res => {
                window.location.reload(false);
            })
            .catch(error => console.log(error));
    }

    const clickClockOut = () => {
        axios.get(`/api_working/clockOut?id=` + user.id)
            .then(res => {
                window.location.reload(false);
            })
            .catch(error => console.log(error));
    }

    function tick() {
        setClock(new Date().toLocaleString());
    }

    const data = [
        dataWorkingHours,
        dataOffHours
    ]

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

    React.useEffect(() => {
        //Set user from widowStorage Session
        setUser(JSON.parse(window.sessionStorage.getItem("user")));
        console.log(user)
        axios.get(`/api/profile/` + user.id)
            .then(res => {
                const data_emps = res.data;
                setEmp(data_emps);
            })
            .catch(error => console.log(error));
    }, [])

    React.useEffect(() => {
        var d = new Date();
        axios.get(`/api_working/number_hour_off?id=`+ user.id + '&date_month=' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate())
            .then(res => {
                var month = 0;
                var date = new Date(d.getFullYear(), month, 1);
                while (date.getMonth() < d.getMonth()) {

                    var data = dataOffHours;
                    data.data[month][1] = res.data - (new Date(date.getFullYear(), date.getMonth(), 0).getDate() - countOffDaySuitable(date.getFullYear(), date.getMonth())) * 8;

                    setDataOffHours(data);
                    month += 1;
                    date = new Date(d.getFullYear(), month, 1);

                    if (month === date.getMonth()) {
                        data.data[month][1] = (countOffDaySuitableToCurrentDate(today.getFullYear(), today.getMonth(), today.getDate()) * 8 + emp.actualHourOff) - emp.actualWorkingDayHour;
                        setDataOffHours(data);
                    }
                }
            })
            .catch(error => console.log(error));
    })

    React.useEffect(() => {
        var d = new Date();
        var month = 0;
        var date = new Date(d.getFullYear(), month, 1);
        while (date.getMonth() < d.getMonth()) {

            var dataWorking = dataWorkingHours;
            dataWorking.data[month][1] = countOffDaySuitable(date.getFullYear(), date.getMonth()) * 8 - dataOffHours.data[month][1];
            setDataWorkingHours(dataWorking);

            month += 1;
            date = new Date(d.getFullYear(), month, 1);

            if (month === date.getMonth()) {
                dataWorking.data[month][1] = emp.actualWorkingDayHour;
                setDataWorkingHours(dataWorking);
            }
        }
    })

    React.useEffect(() => {
        axios.get(`/api_working/isChecked?id=`+ user.id)
            .then(res => {
                var isChecked = res.data;
                console.log(isChecked)
                if (isChecked[0] == 1 ){
                    if(isChecked[1] == 1){
                        setStateLock(
                            [true, true]
                        );
                    }
                    else {
                        setStateLock(
                            [true, false]
                        );
                    }
                    
                }
            })
            .catch(error => console.log(error));
    })  

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
                                endIcon={<CheckCircleOutlineIcon clickClockIn />}
                                onClick={() => { clickClockIn() }}
                                disabled={stateLock[0]}
                            >
                                {'CLOCK-IN !!!'}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                endIcon={<CheckCircleOutlineIcon clickClockOut />}
                                onClick={() => { clickClockOut() }}
                                disabled={stateLock[1]}
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
                                        <TableCell align="left">{emp.emp_code}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            FULL NAME:
                                        </TableCell>
                                        <TableCell align="left">{emp.emp_name}</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            ACTUAL WORKING DAY:
                                        </TableCell>
                                        <TableCell align="left">{emp.actualWorkingDay}/{countOffDaySuitable(today.getFullYear(), today.getMonth())} (days)</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            ACTUAL WORKING HOUR:
                                        </TableCell>
                                        <TableCell align="left">{emp.actualWorkingDayHour}/{countOffDaySuitable(today.getFullYear(), today.getMonth()) * 8} (hours)</TableCell>
                                        <TableCell className={classesGrid.nameField} component="th" scope="row">
                                            HOURS OFF:
                                        </TableCell>
                                        <TableCell align="left">{(countOffDaySuitableToCurrentDate(today.getFullYear(), today.getMonth(), 20) * 8 + emp.actualHourOff) - emp.actualWorkingDayHour} (hours)</TableCell>
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