import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';
import ContactsIcon from '@material-ui/icons/Contacts';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FormControl from '@material-ui/core/FormControl';
import { useContext } from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import moment from 'moment';
import PrimarySearchAppBar from './header'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import { waitForElementToBeRemoved } from '@testing-library/dom';
import 'react-phone-input-2/lib/style.css'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import Input from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import { set } from 'date-fns/esm';

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
    error: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: 'red',
    }
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
        backgroundColor: '#f4f4f4'
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
    const classesGrid = useStylesGrid();
    const [msgPhone, setMsgPhone] = React.useState('');
    const [msgICard, setMsgICard] = React.useState('');
    const [msgUsername, setMsgUsername] = React.useState('');

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
        },
    });

    const [department, setDepartment] = React.useState([]);
    const [title, setTitle] = React.useState([]);
    const [manager, setManager] = React.useState([]);

    const [genderOption, setGenderOption] = React.useState("");
    const [departmentOption, setdepartmentOption] = React.useState("");
    const [titleOption, settitleOption] = React.useState("");
    const [birthdayOption, setbirthdayOption] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
    const [roleOption, setRoleOption] = React.useState(0);
    const [mngOption, setMngOption] = React.useState("");
    const [auth, setAuth] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [valueIcard, setValueIcard] = React.useState('');
    const [valueUsername, setValueUsername] = React.useState('');
    const [country, setCountry] = React.useState('US');

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

    const handleChangeMng = event => {
        setMngOption(event.target.value);
    };

    const checkEmail = (evt) => {
        const username = evt.target.value;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(username).toLowerCase())) {
            setMsgUsername('Username must correct with pattern');
        }
        else {
            setMsgUsername('');
        }
        setValueUsername(username);
    };

    const checkICard = (evt) => {
        const valueIcard = evt.target.value;
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/im
        if (!re.test(String(valueIcard).toLowerCase())) {
            setMsgICard('CMND must have at least 9 characters and digits');
        }
        else {
            setMsgICard('');
        }
        console.log(valueIcard);
        setValueIcard(valueIcard);
    };

    const checkPhoneNumber = (vl) => {
        if (!vl) {
            console.log('Phone number required');
        }
        if (!isValidPhoneNumber) {
            console.log('Invalid phone number');
        }
    };

    const changePhoneNumber = (value) => {
        if (!value) {
            setMsgPhone('Phone number required');
            console.log('Phone number required');
        }
        else if (!isValidPhoneNumber(value)) {
            setMsgPhone('Invalid phone number');
            console.log('Invalid phone number');
        }
        else {
            setMsgPhone('');
        }
        setValue(value);
    };

    const set_default_value_text = (username, phone, icard) => {
        setError(
            {
                icard,
                phone,
                username
            }
        );
    };

    const handlerCreateEmp = () => {
        var emp = {
            emp_code: document.getElementById('username').value,
            emp_name: document.getElementById('name').value,
            gender: genderOption,
            address: document.getElementById('address').value,
            dob: birthdayOption,
            phone_number: value,
            identification_card: document.getElementById('identification_card').value,
            emp_department: departmentOption,
            emp_title: titleOption,
            role: roleOption,
            date_join: "",
            note: "",
            emp_mng: mngOption,
        }

        if (msgPhone !== '' || msgICard !== '' || msgUsername !== '') {
            return;
        }
        else {
            axios({
                method: 'post',
                headers: {
                    'crossDomain': true,
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                url: '/api/create',
                data: emp,
            })
                .then(function (response) {
                    var data = response.data;
                    if (data === 'HADEMP') {
                        setMsgUsername('Username already exists');
                    }
                    else if (data === 'SUCCESS') {
                        history.push('/employees')
                    }
                    console.log(data);
                })
                .catch(function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                });
        }
    }

    React.useEffect(() => {
        if (JSON.parse(window.sessionStorage.getItem("user")) != null) {
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
                <PrimarySearchAppBar username={JSON.parse(window.sessionStorage.getItem("user")).emp_code} />

                <Paper className={classesGrid.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <div className={classesGrid.title}>Create Account</div>
                            <div className={classesGrid.error}>
                                {msgPhone}
                                <br/>
                                {msgICard}
                                <br/>
                                {msgUsername}
                            </div>
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
                            <TextField value={valueUsername} onChange={checkEmail} className={classesGrid.textfield} fullWidth id="username" label="Username" variant="outlined" InputProps={{
                                endAdornment: (
                                    <AccountCircle />
                                ),
                            }} />
                        </Grid>
                        <Grid item xs={6}>
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
                        <Grid item container xs={6}>
                            {/* <TextField error={error.phone.isError} helperText={error.phone.msg} className={classesGrid.textfield} id="phoneNumber" label="Phone Number" variant="outlined" InputProps={{
                                endAdornment: (
                                    <PhoneIcon />
                                ),
                            }} /> */}
                            <Grid item xs={3} style={{ marginRight: '20px' }}>
                                <Select
                                    value={country}
                                    onChange={event => setCountry(event.target.value || undefined)}>
                                    <option value="">
                                        {en['ZZ']}
                                    </option>
                                    {getCountries().map((country) => (
                                        <option key={country} value={country}>
                                            {country} +{getCountryCallingCode(country)}
                                        </option>
                                    ))}
                                </Select>
                            </Grid>
                            <br />
                            <Grid item xs={8}>
                                {/* <TextField error={error.phone.isError} helperText={error.phone.msg} className={classesGrid.textfield} id="phoneNumber" label="Phone Number" variant="outlined" InputProps={{
                                endAdornment: (
                                    <PhoneIcon />
                                ),
                            }} /> */}
                                <Input className={classesGrid.textfield}
                                    style={{ borderRadius: '4px', fontSize: '16px' }}
                                    placeholder="Enter phone number"
                                    country={country}
                                    value={value}
                                    onChange={changePhoneNumber}
                                    error={value ? (isValidPhoneNumber(value) ? undefined : console.log('Invalid phone number')) : console.log('Phone number required')} />

                            </Grid>
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
                            <TextField value={valueIcard} onChange={checkICard} id="identification_card" label="Identification Card" variant="outlined" helperText={error.icard.msg} InputProps={{
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