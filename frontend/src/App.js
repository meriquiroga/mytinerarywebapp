import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import City from "./pages/City";
import NotFound404 from "./pages/NotFound404";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import {connect} from 'react-redux'
import usersActions from './redux/actions/usersActions';
import { useEffect } from "react";

const App = (props) => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.logInLS(localStorage.getItem('token'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City} />
        {!props.token && (<Route path="/login" component={LogIn} />)}
        {!props.token && (<Route path="/signup" component={SignUp} />)}
        <Route path="/notfound" component={NotFound404} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.usersReducer.token,
  }
}

const mapDispatchToProps = {
  logInLS: usersActions.logInLS,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
