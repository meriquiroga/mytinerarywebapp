import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux'
import usersActions from '../redux/actions/usersActions';
import GoogleLogin from 'react-google-login'
import { toast } from 'react-toastify';

const SignUp = (props) => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState()
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    img: '',
    country:''
  })

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
        let response = await props.signUp(userInfo)
          if (response.data.success) {
            toast('User created, welcome!', {
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
        setError(newError.data.error || newError.data.errors.map((error) => error.message))
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
    let googleUser = {
      name: res.profileObj.givenName,
      surname: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      img: res.profileObj.imageUrl,
      country:'United States of America',
      google: true
    }
    try {
      let response = await props.signUp(googleUser)
        if (response.data.success) {
          toast('User created, welcome!', {
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
          setError(newError.data.error || newError.data.errors.map((error) => error.message))
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

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=name")
      .then((response) => setCountries(response.data))
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <div className="contenedor">
        <div>
          <h4 className="signLogTitle">Create your account here</h4>
        </div>
        <div className="signupBox">
          <div className="inputsBox">
            <form>
              <input type="text" name="name" placeholder="Name" value={userInfo.name} onChange={inputHandler}/>
              <input type="text" name="surname" placeholder="Surname" value={userInfo.surname} onChange={inputHandler} />
              <input type="email" name="email" placeholder="E-mail" value={userInfo.email} onChange={inputHandler} />
              <input type="password" name="password" placeholder="Password" value={userInfo.password} onChange={inputHandler} />
              <input type="text" name="img" placeholder="URL of your picture" value={userInfo.img} onChange={inputHandler} />
              <div>
                <select className="select" type="select" name="country" value={userInfo.country} onChange={inputHandler}>
                  <option>Select your country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.value}> {country.name} </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="errorsBox">
                  <p>{error}</p>
                </div>
                <button onClick={formSubmit}>SIGN UP</button>
                <GoogleLogin
                  clientId="90360483035-c7utevr36kmf56slherbvjikj3g594pl.apps.googleusercontent.com"
                  buttonText="Sign up with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </form>
          </div>
          <div>
            <Link to="/login">
              <p>Already user? Log in here</p>
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
  signUp: usersActions.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp);
