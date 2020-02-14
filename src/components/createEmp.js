import React, { useState } from 'react';
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
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CompassCalibrationIcon from '@material-ui/icons/CompassCalibration';
import PhoneIcon from '@material-ui/icons/Phone';
import ContactsIcon from '@material-ui/icons/Contacts';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FormControl from '@material-ui/core/FormControl';
import { useContext } from 'react';
import {
    useParams
} from "react-router-dom";
import { __RouterContext as RouterContext } from 'react-router';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';


export function useRouter() {
    return useContext(RouterContext);
}

const useStylesBar = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const useStylesGrid = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    paper: {
        //   maxWidth: 400,
        //   margin: `${theme.spacing(1)}px auto`,
        marginTop: '5%',
        marginBottom: 20,
        marginLeft: '25%',
        marginRight: '25%',
        padding: theme.spacing(2),
        border: '1px solid #BDBDBD',
        // backgroundColor: '#F5F5F5',
    },
    gridItem: {
        marginTop: 20,
        marginBottom: 20,
        padding: theme.spacing(2),
    },
    textfield: {
        width: "100%",
        height: "75%"
    },
    title: {
        fontWeight: 'bold',
        fontSize: '32px',
        color: '#34495e',
    },
}));

export default function CreateEmployee() {
    const classesBar = useStylesBar();
    const { history } = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let { id } = useParams();
    const classesGrid = useStylesGrid();
    const [gender, setGender] = React.useState('');
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleChangeGender = event => {
        setGender(event.target.value);
    };

    return (
        <div className={classesBar.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classesBar.title}>
                        Employee title
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
                            <div className={classesGrid.title}>Tạo tài khoản nhân viên</div>
                        </Grid>
                    </Grid>
                    <hr/>
                    <br/>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} fullWidth id="outlined-basic" label="Tên tài khoản" variant="outlined" InputProps={{
                                endAdornment: (
                                    <AccountCircle />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} fullWidth id="outlined-basic" label="Mật khẩu" variant="outlined" InputProps={{
                                endAdornment: (
                                    <CompassCalibrationIcon />
                                ),
                            }} />
                        </Grid>
                    </Grid>
                        <hr/>
                        <br/>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} id="outlined-basic" label="Họ tên" variant="outlined" InputProps={{
                                endAdornment: (
                                    <AccountBoxIcon />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} id="outlined-basic" label="Số điện thoại" variant="outlined" InputProps={{
                                endAdornment: (
                                    <PhoneIcon />
                                ),
                            }} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} id="outlined-basic" label="Địa chỉ" variant="outlined" InputProps={{
                                endAdornment: (
                                    <ContactsIcon />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker className={classesGrid.textfield}
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Ngày sinh"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField className={classesGrid.textfield} id="outlined-basic" label="CMND" variant="outlined" InputProps={{
                                endAdornment: (
                                    <FingerprintIcon />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    onChange={handleChangeGender}
                                >
                                    <MenuItem value={1}>Nam</MenuItem>
                                    <MenuItem value={0}>Nu</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Phòng</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={gender}
                                    onChange={handleChangeGender}
                                >
                                    <MenuItem value={1}>Room 1</MenuItem>
                                    <MenuItem value={0}>Room 1</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    onChange={handleChangeGender}
                                    placeholder="Chức vụ"
                                >
                                    <MenuItem value={1}>Trưởng</MenuItem>
                                    <MenuItem value={0}>Phó</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item>
                            <Button style={{width: '150px'}}size="medium" variant="contained" color="primary" href="#contained-buttons">
                                Tạo
                                </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
}