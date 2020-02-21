import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import useRouter from '../common/router'
import { useContext } from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import CompassCalibrationIcon from '@material-ui/icons/CompassCalibration';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

export function useRouter() {
    return useContext(RouterContext);
}

const useStylesGrid = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    paper: {
        marginTop: '15%',
        // marginBottom: 20,
        marginLeft: '25%',
        marginRight: '25%',
        padding: theme.spacing(2),
        border: '1px solid #BDBDBD',
        backgroundColor: '#F5F5F5',

    },
    gridItem: {
        marginTop: 20,
        // marginBottom: 20,
        padding: theme.spacing(2),
        position: 'center'
    },
    textfield: {
        width: "100%",
        height: "75%",
        backgroundColor: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '32px',
        color: '#34495e',
    },
}));

export default function LoginPage(props) {
    const classesGrid = useStylesGrid();
    const { history } = useRouter();

    const responseGoogle = (response) => {
        console.log(response);
        var finalData = { }
        
        axios({
            method: 'post',
            headers: {    
                'crossDomain': true,
                //'Content-Type': 'application/json',
                'Content-Type': 'text/plain;charset=utf-8',
            },
            url: '/api_working/login',
            data: {
                emp_code: response.profileObj.email
            },
        })
        .then(function(response) {
            finalData = response.data;
            window.sessionStorage.setItem('user', JSON.stringify(finalData));
            console.log(finalData);
            if (finalData.role == 1){
                history.push("/employees");
            }
            else if (finalData.role == 0){
                history.push("/profile");
            }
        })
        .catch(function(xhr, ajaxOptions, thrownError) {
            alert("Not Found Employee");
        });
    }

    const responseGoogleFail = (response) => {
        console.log(response);
    }

    return (
        <div className={classesGrid.root}>
            <Paper className={classesGrid.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <div className={classesGrid.title}>Đăng nhập</div>
                    </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <GoogleLogin
                        //{h3uvTv5d_VXc6uPoCRaaq1G7}
                            clientId="91542920287-r66lr46326lshr3ma83ealobo5ddreov.apps.googleusercontent.com"
                            buttonText="Đăng nhập với google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogleFail}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <div>hoặc</div>
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <TextField className={classesGrid.textfield} fullWidth id="user" label="Tên tài khoản" variant="outlined" InputProps={{
                            endAdornment: (
                                <AccountCircle />
                            ),
                        }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className={classesGrid.textfield} fullWidth id="password" label="Mật khẩu" variant="outlined" InputProps={{
                            endAdornment: (
                                <CompassCalibrationIcon />
                            ),
                        }} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Button size="medium" variant="contained" color="primary" onClick={() => { responseGoogle() }}>
                            Đăng nhập
                                </Button>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    );
}