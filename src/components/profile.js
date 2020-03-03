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
import HttpsIcon from '@material-ui/icons/Https';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import DetailsIcon from '@material-ui/icons/Details';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'auto',
        height: '25%'
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

const useStylesBar = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

const useStylesGrid = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        marginTop: '5%',
        marginLeft: '-15%',
    },
    paper: {
        marginTop: 25,
        marginBottom: 10,
        // marginLeft: "15%",
        marginRight: "15%",
        padding: theme.spacing(2),
        border: '1px solid #BDBDBD',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '24px',
        color: '#34495e',
        marginBottom: '10px'
    },
    nameField: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#34495e',
    },
    clock: {
        fontWeight: 'bold',
        fontSize: '32px',
        color: '#34495e',
    },
    timeCheck: {
        fontWeight: 'bold',
        fontSize: '24px',
        color: '#34495e',
        textAlign: 'left',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
    },
    logo: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        width: '100%',
        height: '100%'
    }
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

export function useRouter() {
    return useContext(RouterContext);
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

    return new Date(year, month, current_date).getDate() - counter - 1;
}

export default function Profile() {
    const [open, setOpen] = React.useState(false);
    const [clock, setClock] = React.useState(new Date().toLocaleString());
    const [stateLock, setStateLock] = React.useState(
        [false, true]
    );
    const [workingTime, setWorkingTime] = React.useState(
        [
            {

            },
        ]
    );
    const { history } = useRouter();
    const [user, setUser] = React.useState(
        { id: "1", username: "phuocnd", role: "admin" }
    );
    const time_checked = {
        time_in: '',
        time_out: '',
        mark: ''
    }

    const [timeChecked, setTimeChecked] = React.useState(time_checked);
    const [emp, setEmp] = React.useState({});
    const classes = useStyles();
    const classesBar = useStylesBar();
    const classesGrid = useStylesGrid();

    const [dataWorkingHours, setDataWorkingHours] = React.useState(
        {
            label: 'Working hours',
            data: [
                ['January', 0], ['February', 0], ['March', 0], ['April', 0], ['May', 0], ['July', 0], ['June', 0], ['August', 0], ['September', 0], ['October', 0], ['November', 0], ['December', 0]
            ]
        }
    );
    const [dataOffHours, setDataOffHours] = React.useState(
        {
            label: 'Off hours',
            data: [
                ['January', 0], ['February', 0], ['March', 0], ['April', 0], ['May', 0], ['July', 0], ['June', 0], ['August', 0], ['September', 0], ['October', 0], ['November', 0], ['December', 0]
            ]
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
            .catch(error => {
                history.push('/404');
            });
    }

    const clickClockOut = () => {
        axios.get(`/api_working/clockOut?id=` + user.id)
            .then(res => {
                window.location.reload(false);
            })
            .catch(error => {
                history.push('/404');
            });
    }

    const clickDetail = () => {
        setOpen(true);
        axios.get(`/api_working/working_time?id=` + user.id)
            .then(res => {
                setWorkingTime(res.data);
            })
            .catch(error => {
                history.push('/404');
            });
    }

    const logout = () => {
        window.sessionStorage.clear();
        history.push("/home")
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function tick() {
        let current_datetime = new Date();
        setClock(current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
        );
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
        axios.get(`/api/profile/` + user.id)
            .then(res => {
                const data_emps = res.data;
                setEmp(data_emps);
            })
            .catch(error => {
                history.push('/404');
            });
    }, [])

    // set off hours and working hours data into chart
    React.useEffect(() => {
        var d = new Date();

        if (emp.emp_code) {
            console.log('arr here', emp);

            const arr = [];
            var month = 0;
            var date = new Date(d.getFullYear(), month, 1);
            var data = dataOffHours;
            while (date.getMonth() <= d.getMonth()) {
                arr.push(axios.get(`/api_working/number_hour_off?id=` + user.id + '&date_month=' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()));
                month += 1;
                date = new Date(d.getFullYear(), month, 1);
            }

            Promise.all(arr).then((response) => {
                response.map((res, i) => {
                    data.data[i][1] = res.data - (new Date(today.getFullYear(), i, 0).getDate() - countOffDaySuitable(today.getFullYear(), i)) * 8;

                    if (i === today.getMonth()) {
                        data.data[i][1] = (countOffDaySuitableToCurrentDate(today.getFullYear(), today.getMonth(), today.getDate()) * 8 + emp.actualHourOff) - emp.actualWorkingDayHour;
                    }
                });
                setDataOffHours(data);

                working_hour_func();
            }
            ).catch((err) => { history.push('/404') });
        }
    }, [emp])

    // set working hours data into chart
    const working_hour_func = () => {
        var d = new Date();
        var month = 0;
        var date = new Date(d.getFullYear(), month, 1);
        while (date.getMonth() < d.getMonth()) {

            var dataWorking = dataWorkingHours;
            dataWorking.data[month][1] = countOffDaySuitable(date.getFullYear(), date.getMonth()) * 8 - dataOffHours.data[month][1];

            month += 1;
            date = new Date(d.getFullYear(), month, 1);

            if (month === date.getMonth()) {
                dataWorking.data[month][1] = emp.actualWorkingDayHour;
            }

            setDataWorkingHours(dataWorking);
        }
    };

    // display button clock in clock out
    React.useEffect(() => {
        axios.get(`/api_working/isChecked?id=` + user.id)
            .then(res => {
                var isChecked = res.data;
                if (isChecked[0] == 1) {
                    if (isChecked[1] == 1) {
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
            .catch(error => {
                history.push('/404');
            });
    }, [])

    React.useEffect(() => {
        axios.get(`/api_working/timeChecked?id=` + user.id)
            .then(res => {
                var time = res.data;
                setTimeChecked(
                    {
                        time_in: time[0],
                        time_out: time[1],
                        mark: time[2]
                    }
                )
            })
            .catch(error => {
                history.push('/404');
            });
    }, [])

    return (
        <div className={classesBar.root}>
            <PrimarySearchAppBar username={JSON.parse(window.sessionStorage.getItem("user")).emp_code} drawerWidth={0} />
            <div className={classesGrid.root}>
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<CheckCircleOutlineIcon />}
                                onClick={() => { clickClockIn() }}
                                disabled={stateLock[0]}
                            >
                                {'CLOCK-IN!!!'}
                            </Button>
                        </Grid>
                        <Grid className={classesGrid.timeCheck} item xs={3}>
                            {timeChecked.time_in !== '' && (
                                <div className={classesGrid.timeCheck} ><HttpsIcon width='50' height="50" />: {timeChecked.time_in}</div>
                            )}
                            {timeChecked.time_in === '' && (
                                <div className={classesGrid.timeCheck} >{clock}</div>
                            )}
                        </Grid>
                        <Grid className={classesGrid.timeCheck} item xs={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                endIcon={<CheckCircleOutlineIcon />}
                                onClick={() => { clickClockOut() }}
                                disabled={stateLock[1]}
                            >
                                {'CLOCK-OUT!!!'}
                            </Button>
                        </Grid>
                        <Grid className={classesGrid.timeCheck} item xs={3}>
                            {/* <br/> */}
                            {timeChecked.time_out !== '' && (
                                <div className={classesGrid.timeCheck} ><LockOpenIcon width='50' height="50" />: {timeChecked.time_out} </div>
                            )}
                            {timeChecked.time_out === '' && timeChecked.time_in !== '' && (
                                <div className={classesGrid.timeCheck} >{clock}</div>
                            )}
                        </Grid>
                        <Grid className={classesGrid.timeCheck} item xs={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<DetailsIcon />}
                                onClick={() => { clickDetail() }}
                            >
                                {'DETAILS'}
                            </Button>
                        </Grid>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <div className={classes.paper}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>TIME IN</TableCell>
                                                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>TIME OUT</TableCell>
                                                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>NOTE</TableCell>
                                                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: 'white' }}>HOURS</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {workingTime.map((row, i) => (
                                                <TableRow key={i}>
                                                    <TableCell style={{ fontWeight: 'bold' }}>
                                                        {row.time_in}
                                                    </TableCell >
                                                    <TableCell style={{ fontWeight: 'bold' }}>{row.time_out}</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>{row.mark}</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>{row.time}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Modal>
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
                                        <TableCell align="left">{(countOffDaySuitableToCurrentDate(today.getFullYear(), today.getMonth(), today.getDate()) * 8 + emp.actualHourOff) - emp.actualWorkingDayHour} (hours)</TableCell>
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
                                <Chart width='1000px' height='400px' data={data} series={series} axes={axes} tooltip />
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
}