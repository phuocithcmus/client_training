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
import axios from 'axios';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import moment from 'moment';

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

    const [department, setDepartment] = React.useState([]);
    const [title, setTitle] = React.useState([]);
    const [manager, setManager] = React.useState([]);

    const [genderOption, setGenderOption] = React.useState("");
    const [departmentOption, setdepartmentOption] = React.useState("");
    const [titleOption, settitleOption] = React.useState("");
    const [birthdayOption, setbirthdayOption] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
    const [roleOption, setRoleOption] = React.useState(0);
    const [mngOption, setMngOption] = React.useState([]);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = date => {
        console.log(moment(date).format('YYYY-MM-DD'));
        setbirthdayOption(moment(date).format('YYYY-MM-DD'));
    };

    const handleChangeGender = event => {
        setGenderOption(event.target.value);
    };

    const handleChangeDepartment = event => {
        let id_dep = event.target.value;
        setdepartmentOption(id_dep);

        axios.get(`/api/employees?department=` + id_dep)
            .then(res => {
                const data = res.data;
                console.log(data);
                setManager(data);
            })
            .catch(error => console.log(error));
    };

    const handleChangeTitle = event => {
        settitleOption(event.target.value);
    };

    const handleChangeRole = event => {
        setRoleOption(event.target.value);
    };

    const handleChangeMng = event => {
        setMngOption(event.target.value);
    };

    const handlerCreateEmp = () => {
        var emp = {
            emp_code: document.getElementById('username').value,
            emp_name: document.getElementById('name').value,
            gender: genderOption,
            address: document.getElementById('address').value,
            dob: birthdayOption,
            phone_number: document.getElementById('phoneNumber').value,
            identification_card: document.getElementById('identification_card').value,
            emp_department: departmentOption,
            emp_title: titleOption,
            role: roleOption,
            date_join: "",
            note: "",
            emp_mng: mngOption,
        }

        console.log(emp);
        axios({
            method: 'post',
            headers: {    
                'crossDomain': true,
                //'Content-Type': 'application/json',
                'Content-Type': 'text/plain;charset=utf-8',
            },
            url: '/api/employees/create',
            data: emp,
        })
        .then(function(response) {
            var data = response.data;
            console.log(data);
            //if login token works then get records
        })
        .catch(function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        });
        // axios.post(`http://0.0.0.0:9001/api/employees/create`, emp ,
        //     {
        //         headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Access-Control-Allow-Origin': '*',
        //         "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //         "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        //     },
        //     responseType: 'json',
        // })
        //     .then(res => {
        //         const isSuccess = res.data;
        //         console.log(isSuccess);
        //         // setLoading(false);
        //         // setOpacity(1);
        //         window.location.reload(false);
        //     })
        //     .catch(error => console.log(error));
    }

    React.useEffect(() => {
        axios.get(`/api/department`)
            .then(res => {
                const data = res.data;
                console.log(data);
                setDepartment(data);
            })
            .catch(error => console.log(error));

        axios.get(`/api/title`)
            .then(res => {
                const data = res.data;
                console.log(data);
                setTitle(data);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div className={classesBar.root}>
            {/* <AppBar position="static">
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
            </AppBar> */}

            <div className={classesGrid.root}>
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div className={classesGrid.title}>Tạo tài khoản nhân viên</div>
                        </Grid>
                    </Grid>
                    <hr />
                    <br />
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} fullWidth id="username" label="Tên tài khoản" variant="outlined" InputProps={{
                                endAdornment: (
                                    <AccountCircle />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <TextField className={classesGrid.textfield} fullWidth id="password" label="Mật khẩu" variant="outlined" InputProps={{
                                endAdornment: (
                                    <CompassCalibrationIcon />
                                ),
                            }} /> */}

                            <Select
                                labelId="demo-simple-select-label"
                                id="role"
                                value={roleOption}
                                onChange={handleChangeRole}
                            >
                                <MenuItem value={'1'}>Admin</MenuItem>
                                <MenuItem value={'0'}>User</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                    <hr />
                    <br />
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} id="name" label="Họ tên" variant="outlined" InputProps={{
                                endAdornment: (
                                    <AccountBoxIcon />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} id="phoneNumber" label="Số điện thoại" variant="outlined" InputProps={{
                                endAdornment: (
                                    <PhoneIcon />
                                ),
                            }} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} id="address" label="Địa chỉ" variant="outlined" InputProps={{
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
                                        id="dob"
                                        label="Ngày sinh"
                                        value={birthdayOption}
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
                            <TextField className={classesGrid.textfield} id="identification_card" label="CMND" variant="outlined" InputProps={{
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
                                    id="gender"
                                    value={genderOption}
                                    onChange={handleChangeGender}
                                >
                                    <MenuItem value={'M'}>Nam</MenuItem>
                                    <MenuItem value={'F'}>Nu</MenuItem>
                                    <MenuItem value={'U'}>Khong xac dinh</MenuItem>
                                    <MenuItem value={'I'}>Khong cung cap</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Phòng</InputLabel>
                                <Select
                                    id="department"
                                    value={departmentOption}
                                    onChange={handleChangeDepartment}
                                >
                                    {
                                        department.map(d => (
                                            <MenuItem value={d.id}>{d.department_name}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="title"
                                    value={titleOption}
                                    onChange={handleChangeTitle}
                                    placeholder="Chức vụ"
                                >
                                    {
                                        title.map(t => (
                                            <MenuItem value={t.id}>{t.title_name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <FormControl className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Người quản lý</InputLabel>
                                <Select
                                    id="manager"
                                    value={mngOption}
                                    onChange={handleChangeMng}
                                >
                                    {
                                        manager.map(m => (
                                            <MenuItem value={m.id}>{m.emp_name}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item>
                            <Button style={{ width: '150px' }} size="medium" variant="contained" color="primary" onClick={() => { handlerCreateEmp() }}>
                                Tạo
                                </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
}