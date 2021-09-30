import { useState } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import usersActions from '../redux/actions/usersActions';
import GoogleLogin from 'react-google-login'
import {toast } from 'react-toastify';

const LogIn = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState()

  const inputHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(userInfo).some(property => userInfo[property] === '')) {
      setError('All fields are required.')
      return false
    } else if (!userInfo.email.includes('@')) {
      setError('Please verify your e-mail.')
      return false
    } else {
      try {
        let response = await props.logIn(userInfo)
          if (response.data.success) {
            toast('You are logged in!', {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            }
      } catch (newError) {
        if (newError.data) {
          setError(newError.data.error)
        } else {
          toast('There was a connection error.', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      }
    }
  }

  const responseGoogle = async (res) => {
    let googleLogIn = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      flagGoogle: true
    }
    try {
      let response = await props.logIn(googleLogIn)
        if (response.data.success) {
          toast('You logged in with Google correctly!', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          } 
    } catch (newError) {
      if (newError.data) {
        setError(newError.data.error)
      } else {
        toast('There was a connection error.', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
  }

  
  return (
    <>
      <div className="contenedor">
        <div>
          <h4 className="signLogTitle">Log into your account</h4>
        </div>
        <div className="signupBox">
          <div className="inputsBox">
            <form>
              <input type="email" name="email" placeholder="E-mail" value={userInfo.email} onChange={inputHandler} />
              <input type="password" name="password" placeholder="Password" value={userInfo.password} onChange={inputHandler} />
              <div>
                <div className="errorsBox">
                  <p>{error}</p>
                </div>
                <button onClick={formSubmit}>LOG IN</button>
                
                <GoogleLogin
                  clientId="90360483035-rg0gb8c9obostvf4h7e77inh1p1hrh2f.apps.googleusercontent.com"
                  buttonText="Log in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </form>
          </div>
          <div>
            <Link to="/signup">
              <p>Don't have an account? Sign up here</p>
            </Link>
          </div>
        </div>
        <div className="buscador">
          <Link to="/cities">
            <button>BACK TO CITIES</button>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  logIn: usersActions.logIn,
}

export default connect(null, mapDispatchToProps)(LogIn);