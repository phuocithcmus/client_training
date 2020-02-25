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
import PrimarySearchAppBar from './header'
import { tr } from 'date-fns/esm/locale';
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
        display: 'flex',
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
        display: 'flex',
    },
    paper: {
        marginTop: '5%',
        marginLeft: '25%',
        marginRight: '25%',
        padding: theme.spacing(2),
        border: '1px solid #BDBDBD',
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

export default function CreateEmployee() {
    const classesBar = useStylesBar();
    const classesSide = useStylesSide();
    const { history } = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let { id } = useParams();
    const classesGrid = useStylesGrid();
    const [gender, setGender] = React.useState('');
    const msgICard = 'CMND must have at least 9 characters and digits';
    const msgPhone = 'Phone number must have at least 10 characters and digits';
    const msgUsername = 'Username must correct with pattern';
    const [error, setError] = React.useState({
        icard: {
            isError: false,
            msg: ''
        },
        phone: {
            isError: false,
            msg: ''
        },
        username: {
            isError: false,
            msg: ''
        }
    });
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
    const [auth, setAuth] = React.useState(false);

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
            .catch(error => {
                history.push('/404');
            });
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

    const checkEmail = (username) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(username).toLowerCase());
    };

    const checkICard = (icard) => {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/im
        return re.test(String(icard).toLowerCase());
    };

    const checkPhoneNumber = (phoneNumber) => {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return re.test(String(phoneNumber).toLowerCase());
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

        if (!checkEmail(emp.emp_code)) {
            setError(
                {
                    icard: {
                        isError: error.icard.isError,
                        msg: error.icard.msg
                    },
                    phone: {
                        isError: error.phone.isError,
                        msg: error.phone.msg
                    },
                    username: {
                        isError: true,
                        msg: msgUsername,
                    }
                }
            );
        }

        if (!checkICard(emp.identification_card)) {
            setError(
                {
                    icard: {
                        isError: true,
                        msg: msgICard
                    },
                    phone: {
                        isError: error.phone.isError,
                        msg: error.phone.msg
                    },
                    username: {
                        isError: error.username.isError,
                        msg: error.username.msg
                    }
                }
            );
        }

        if (!checkPhoneNumber(emp.phone_number)) {
            setError(
                {
                    icard: {
                        isError: error.icard.isError,
                        msg: error.icard.msg
                    },
                    phone: {
                        isError: true,
                        msg: msgPhone
                    },
                    username: {
                        isError: error.username.isError,
                        msg: error.username.msg
                    }
                }
            );
        }

        if (!checkEmail(emp.emp_code) || !checkICard(emp.identification_card) || !checkPhoneNumber(emp.phone_number)) {
            return;
        }
        else {
            setError(
                {
                    icard: {
                        isError: false,
                        msg: ''
                    },
                    phone: {
                        isError: false,
                        msg: ''
                    },
                    username: {
                        isError: false,
                        msg: ''
                    }
                }
            );
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
                .then(function (response) {
                    var data = response.data;
                    console.log(data);
                    history.push('/employees')
                    //if login token works then get records
                })
                .catch(function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                });
        }
    }

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
            <div className={classesGrid.root}>
            <PrimarySearchAppBar username={JSON.parse(window.sessionStorage.getItem("user")).emp_code} drawerWidth={240}/>
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
                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div className={classesGrid.title}>Create Account</div>
                        </Grid>
                    </Grid>
                    <hr />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item>
                            <div style={{ fontSize: '25px', color: '#34495e' }}><b>Account</b></div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField error={error.username.isError} helperText={error.username.msg} className={classesGrid.textfield} className={classesGrid.textfield} fullWidth id="username" label="Username" variant="outlined" InputProps={{
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
                            <div style={{ fontSize: '18px', color: 'red' }}><b>Type username with format: "emp_code" + @example.com</b></div>
                        </Grid>
                    </Grid>
                    <hr />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item>
                            <div style={{ fontSize: '25px', color: '#34495e' }}><b>Employee Information</b></div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} id="name" label="Name" variant="outlined" InputProps={{
                                endAdornment: (
                                    <AccountBoxIcon />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField error={error.phone.isError} helperText={error.phone.msg} className={classesGrid.textfield} id="phoneNumber" label="Phone Number" variant="outlined" InputProps={{
                                endAdornment: (
                                    <PhoneIcon />
                                ),
                            }} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField className={classesGrid.textfield} id="address" label="Address" variant="outlined" InputProps={{
                                endAdornment: (
                                    <ContactsIcon />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider style={{}} utils={DateFnsUtils}>
                                <KeyboardDatePicker className={classesGrid.textfield}
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="dob"
                                    label="Date Of Birth"
                                    value={birthdayOption}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField error={error.icard.isError} className={classesGrid.textfield} id="identification_card" label="Identification Card" variant="outlined" helperText={error.icard.msg} InputProps={{
                                endAdornment: (
                                    <FingerprintIcon />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
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
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Department</InputLabel>
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

                        <Grid item xs={6}>
                            <FormControl variant="outlined" className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Title</InputLabel>
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
                        <Grid item xs={6}>
                            <FormControl variant="outlined" className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Manager</InputLabel>
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
                        {/* <Grid item xs={6}>
                            <FormControl variant="outlined" className={classesGrid.textfield}>
                                <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
                                <Select
                                    variant="outlined"
                                    labelId="demo-simple-select-label"
                                    id="role"
                                    value={roleOption}
                                    onChange={handleChangeRole}
                                >
                                    <MenuItem value={'1'}>Admin</MenuItem>
                                    <MenuItem value={'0'}>User</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                    </Grid>
                    <br />
                    <hr />
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Button style={{ width: "100%", height: "100%", textAlign: 'center', fontSize: '20px' }} variant="contained" color="primary" onClick={() => { handlerCreateEmp() }}>
                                Create
                                </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
}