import { makeStyles } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router } from "react-router-dom";
import React from 'react';
// import axios from 'axios';
import Employees from "./components/empList"
import Employee from "./components/emp"
import LoginPage from "./components/login"
import CreateEmployee from "./components/createEmp"
import Profile from "./components/profile"
import NotFound from "./components/error"
import Background from '../src/images/Dull.jpg'

const useStyle = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    /* Full height */
    // height: '100%',

    /* Center and scale the image nicely */
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%'
  },
}));

function App() {
  const classes = useStyle();

  return (
    <Router>
      <div className={classes.root}>
        <Route path="/home" component={LoginPage} />
        <Route path="/employees" component={Employees} />
        <Route extract path="/employee/id/:id" component={Employee} />
        <Route extract path="/employee/create" component={CreateEmployee} />
        <Route extract path="/profile" component={Profile} />
        <Route extract path="/404" component={NotFound} />
      </div>
    </Router>
  );
}

export default App;