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
import PrimarySearchAppBar from './header'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@material-ui/icons/Lock';


export function useRouter() {
    return useContext(RouterContext);
}

const useStylesBar = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    table: {
        width: '98%',
        marginLeft: '20px',
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
        backgroundColor: '#f4f4f4'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

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
        paperInformation: {
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
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            marginTop: "5%",
            marginBottom: 25,
            marginLeft: "5%",
            marginRight: "5%",
        },
        modal: {
            outline: 'none'
        },
    }
));

export default function Employees() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const classesBar = useStylesBar();
    const [auth, setAuth] = React.useState(false);
    const { history } = useRouter();
    const [openNoti, setOpen] = React.useState(false);
    const [datas, setDataEmp] = React.useState([]);
    const [idEmp, setIdEmp] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [opa, setOpacity] = React.useState(1);
    const classesSide = useStylesSide();
    const [openModal, setOpenModal] = React.useState(false);
    const [empData, setEmpData] = React.useState(null);
    const [isActive, setActive] = React.useState(true);

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
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const showInfo = (id) => {
        setOpenModal(true);
        axios.get(`/api/employees/` + id)
            .then(res => {
                setEmpData(res.data);
                console.log(res.data);
            })
            .catch(error => {
                history.push('/404');
            });
        // history.push("/employee/id/" + id);
    };

    const openDialogDeactive = (id, i) => {
        datas[i] && datas[i].date_left != null ? setActive(false) : setActive(true);
        setOpen(true);
        setIdEmp(id);
    };

    const closeDialogDeactive = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setOpenModal(false);
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

    const agreeActive = (id) => {
        setOpen(false);
        axios.post(`/api/employees/activeEmp/` + idEmp)
            .then(res => {
                const isActive = res.data;
                console.log(isActive);
                window.location.reload(false);
            })
            .catch(error => {
                history.push('/404');
            });
    };

    const handleCreate = () => {
        history.push('employee/create');
    }

    return (
        <div className={classesBar.root} >
            <PrimarySearchAppBar username={JSON.parse(window.sessionStorage.getItem("user")) != null ? JSON.parse(window.sessionStorage.getItem("user")).emp_code : null} />

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
                <TableContainer component={Paper}>
                    <Table style={{ overflowX: 'auto' }} className={classes.table} aria-label="custom pagination table">
                        <TableHead className={classes.tableHead}>
                            <TableRow >
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">EMP CODE</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">EMP NAME&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">GENDER&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">DOB&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">ADDRESS&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap', }} align="left">PHONE NUMBER&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap', }} align="left">IDENTIFICATION CARD&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">DATE JOIN&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">DATE LEFT&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">NOTE&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">EMP MNG&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap', }} align="left">EMP DEPARTMENT&nbsp;</TableCell>
                                <TableCell style={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap', }} align="left">EMP TITLE&nbsp;</TableCell>
                                {/* <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">ROLE&nbsp;</TableCell> */}
                                <TableCell style={{ color: 'white', fontWeight: 'bold', }} align="left">ACTION&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : datas
                            ).map((row, i) => (
                                <TableRow id={row.id}>
                                    <TableCell >
                                        {row.emp_code}
                                    </TableCell>
                                    <TableCell align="left">{row.emp_name}</TableCell>
                                    <TableCell align="left">{row.gender}</TableCell>
                                    <TableCell style={{ whiteSpace: 'nowrap' }} align="left">{row.dob}</TableCell>
                                    <TableCell align="left">{row.address}</TableCell>
                                    <TableCell align="left">{row.phone_number}</TableCell>
                                    <TableCell align="left">{row.identification_card}</TableCell>
                                    <TableCell style={{ whiteSpace: 'nowrap' }} align="left">{row.date_join}</TableCell>
                                    <TableCell style={{ whiteSpace: 'nowrap' }} align="left">{row.date_left}</TableCell>
                                    <TableCell align="left">{row.note}</TableCell>
                                    <TableCell style={{ whiteSpace: 'nowrap' }} align="left">{row.emp_mng}</TableCell>
                                    <TableCell align="left">{row.emp_department}</TableCell>
                                    <TableCell style={{ whiteSpace: 'nowrap' }} align="left">{row.emp_title}</TableCell>
                                    {/* <TableCell align="left">{row.role == 1 ? 'Admin' : 'User'}</TableCell> */}
                                    <TableCell style={{ whiteSpace: 'nowrap' }} align="left">
                                        <IconButton
                                            aria-label="Show information employee"
                                            onClick={() => { showInfo(row.id) }}
                                            color="inherit"
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                        {
                                            empData != null && (
                                                <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={openModal}
                                            onClose={handleClose}
                                            closeAfterTransition
                                            disableAutoFocus={false}
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <div className={classes.root}>
                                                <Paper className={classes.paperInformation}>
                                                    <Paper className={classes.paperInformation}>
                                                        <Grid container spacing={2}>
                                                            <Grid item>
                                                                <div className={classes.title}>Employee Information</div>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <TableContainer component={Paper}>
                                                                <Table aria-label="caption table">
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                ID:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.id}</TableCell>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                USERNAME:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.emp_code}</TableCell>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                NAME:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.emp_name}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                GENDER:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.gender}</TableCell>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                BIRTHDAY:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.dob}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Grid>
                                                    </Paper>
                                                    <Paper className={classes.paperInformation}>
                                                        <Grid container spacing={2}>
                                                            <Grid item>
                                                                <div className={classes.title}>Contact Information</div>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <TableContainer component={Paper}>
                                                                <Table aria-label="caption table">
                                                                    <TableBody>
                                                                        <TableRow>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                ADDRESS:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.address}</TableCell>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                IDENTIFICATION CARD:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.identification_card}</TableCell>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                PHONE NUMBER:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.phone_number}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                ROOM:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.emp_department}</TableCell>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                POSITION:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.emp_title}</TableCell>
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                HIRE DATE:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.date_join}</TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                            <TableCell width={'16.67%'} className={classes.nameField} component="th" scope="row">
                                                                                LEFT DATE:
                                        </TableCell>
                                                                            <TableCell width={'16.67%'} align="left">{empData.date_left}</TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Grid>
                                                    </Paper>
                                                </Paper>
                                            </div>
                                        </Modal>
                                            )
                                        }
                                        <IconButton
                                            aria-label="deactive employee"
                                            onClick={() => { openDialogDeactive(row.id, i) }}
                                            color="inherit"
                                        >
                                            {datas[i] && datas[i].date_left != null ? (<LockOpenIcon/>) : (<LockIcon/>)}
                                        </IconButton>
                                        {isActive === false ? (
                                            <Dialog
                                            open={openNoti}
                                            onClose={closeDialogDeactive}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            style={{ opacity: 0.6, }}
                                            color="inherit"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Active Employee?"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-descriptionyle">
                                                    Do you want active this employee?
                                        </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button variant="contained" onClick={closeDialogDeactive} color="primary">
                                                    Disagree
                                            </Button>
                                                <Button variant="contained" onClick={() => { agreeActive(row.id) }} color="primary" autoFocus>
                                                    Agree
                                            </Button>
                                            </DialogActions>
                                        </Dialog>
                                        ) : (
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
                                        )}
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
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
            </div>
        </div>
    );
}