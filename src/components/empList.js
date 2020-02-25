import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useContext } from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from 'axios';
import { set } from 'date-fns';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import { turquoise } from 'color-name';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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

export function useRouter() {
    return useContext(RouterContext);
}

const useStylesBar = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    table: {
        width: `calc(100% - ${drawerWidth + 40}px)`,
        marginLeft: drawerWidth + 20,
        paddingRight: '10px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
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


const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, name, calories, fat, action) {
    return { id, name, calories, fat, action };
}

const rows = [
    createData(1, 'Cupcake', 305, 3.7, 0),
    createData(2, 'Donut', 452, 25.0, 0),
    createData(3, 'Eclair', 262, 16.0, 0),
    createData(4, 'Frozen yoghurt', 159, 6.0, 0),
    createData(5, 'Gingerbread', 356, 16.0, 0),
    createData(6, 'Honeycomb', 408, 3.2, 0),
    createData(7, 'Ice cream sandwich', 237, 9.0, 0),
    createData(8, 'Jelly Bean', 375, 0.0, 0),
    createData(9, 'KitKat', 518, 26.0, 0), ,
    createData(10, 'Lollipop', 392, 0.2, 0),
    createData(11, 'Marshmallow', 318, 0, 0),
    createData(12, 'Nougat', 360, 19.0, 0),
    createData(13, 'Oreo', 437, 18.0, 0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles(theme => (
    {
        table: {
            // minWidth: '100%',
            fontWeight: 'bold',
            fontSize: '16px',
            overflow: 'auto',
        },
        button: {
            float: 'right',
            marginTop: '5%',
            marginBottom: '10px',
        },
        tableHead: {
            backgroundColor: '#3f51b5',
            color: 'white',
            font: 'bold'
        },
        paper: {
            marginTop: 25,
            marginBottom: 10,
            marginLeft: "15%",
            marginRight: "15%",
            padding: theme.spacing(2),
            border: '1px solid #BDBDBD',
            backgroundColor: '#F5F5F5',
        },
    }
));

const useStylesModal = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default function Employees() {
    const classes = useStyles2();
    const classesModal = useStylesModal();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classesBar = useStylesBar();
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { history } = useRouter();
    const [openNoti, setOpen] = React.useState(false);
    const [datas, setDataEmp] = React.useState([]);
    const [idEmp, setIdEmp] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [openModal, setOpeModal] = React.useState(false);
    const [opa, setOpacity] = React.useState(1);
    const classesSide = useStylesSide();

    React.useEffect(() => {
        axios.get(`/api/employees`)
            .then(res => {
                const data_emps = res.data;
                console.log(data_emps);
                setDataEmp(data_emps);
            })
            .catch(error => {
                history.push('/404');
            });
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
    }, [])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const showInfo = (id) => {
        history.push("/employee/id/" + id);
    };

    const openDialogDeactive = (id) => {
        setOpen(true);
        setIdEmp(id);
    };

    const closeDialogDeactive = () => {
        setOpen(false);
    };

    const agreeDeactive = (id) => {
        setOpen(false);
        setLoading(true);
        setOpacity(0.7);
        console.log(idEmp);
        axios.post(`/api/employees/deactiveEmp/` + idEmp)
            .then(res => {
                const isActive = res.data;
                console.log(isActive);
                setLoading(false);
                setOpacity(1);
                window.location.reload(false);
            })
            .catch(error => {
                history.push('/404');
            });
    };

    const handleCreate = () => {
        history.push('employee/create');
    }

    const handleProfile = () => {
        history.push('/profile');
    }

    return (
        <div className={classesBar.root} >
            <PrimarySearchAppBar username={JSON.parse(window.sessionStorage.getItem("user")) != null ? JSON.parse(window.sessionStorage.getItem("user")).emp_code : null} drawerWidth={240}/>
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
            <div className={classesBar.table} >
                <div className={classes.button}>
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<AddBoxIcon />}
                        onClick={handleCreate}
                    >
                        {'Create'}
                    </Button>
                </div>
                {/* <div className={classes.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<AccountCircle />}
                        onClick={handleProfile}
                    >
                        {'Profile'}
                    </Button>
                </div> */}
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead className={classes.tableHead}>
                            <TableRow >
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">EMP CODE</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">EMP NAME&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">GENDER&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">DOB&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">ADDRESS&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">PHONE NUMBER&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">IDENTIFICATION CARD&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">DATE JOIN&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">DATE LEFT&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">NOTE&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">EMP MNG&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">EMP DEPARTMENT&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">EMP TITLE&nbsp;</TableCell>
                                {/* <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">ROLE&nbsp;</TableCell> */}
                                <TableCell width={'10%'} style={{ color: 'white', fontWeight: 'bold', }} align="left">ACTION&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : datas
                            ).map(row => (
                                <TableRow id={row.id}>
                                    <TableCell >
                                        {row.emp_code}
                                    </TableCell>
                                    <TableCell align="left">{row.emp_name}</TableCell>
                                    <TableCell align="left">{row.gender}</TableCell>
                                    <TableCell align="left">{row.dob}</TableCell>
                                    <TableCell align="left">{row.address}</TableCell>
                                    <TableCell align="left">{row.phone_number}</TableCell>
                                    <TableCell align="left">{row.identification_card}</TableCell>
                                    <TableCell align="left">{row.date_join}</TableCell>
                                    <TableCell align="left">{row.date_left}</TableCell>
                                    <TableCell align="left">{row.note}</TableCell>
                                    <TableCell align="left">{row.emp_mng}</TableCell>
                                    <TableCell align="left">{row.emp_department}</TableCell>
                                    <TableCell align="left">{row.emp_title}</TableCell>
                                    {/* <TableCell align="left">{row.role == 1 ? 'Admin' : 'User'}</TableCell> */}
                                    <TableCell align="left">
                                        <IconButton
                                            aria-label="Show information employee"
                                            onClick={() => { showInfo(row.id) }}
                                            color="inherit"
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="deactive employee"
                                            onClick={() => { openDialogDeactive(row.id) }}
                                            color="inherit"
                                        >
                                            <LockOpenIcon />
                                        </IconButton>
                                        <Dialog
                                            open={openNoti}
                                            onClose={closeDialogDeactive}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            style={{ opacity: 0.6, }}
                                            color="inherit"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Deactive Employee?"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-descriptionyle">
                                                    Do you want deactive this employee?
                                        </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button variant="contained" onClick={closeDialogDeactive} color="primary">
                                                    Disagree
                                            </Button>
                                                <Button variant="contained" onClick={() => { agreeDeactive(row.id) }} color="primary" autoFocus>
                                                    Agree
                                            </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow >
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={4}
                                    count={datas.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                {/* {
                loading && <div className={classesModal.modal}>
                    <CircularProgress />
                </div>
            } */}
            </div>
        </div>
    );
}