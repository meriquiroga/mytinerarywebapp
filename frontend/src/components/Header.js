import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import usersActions from '../redux/actions/usersActions'

const Header = (props) => {
    return (
        <header>
            <div className="d-flex justify-content-between align-items-center">
            <nav className="navbar navbar-expand-lg navbar-dark bg-none">
            <div className="container-fluid">
                <div className="navbar-brand d-none d-lg-block"><img src='/assets/logo.png' alt=""/></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse border-none" id="navbarNav">
                <ul className="navbar-nav border-none">
                    <li className="nav-item">
                    <NavLink exact to="/"><p>HOME</p></NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/cities"><p>CITIES</p></NavLink>
                    </li>
                    <li className="nav-item">
                    {!props.token && <NavLink to="/signup"><p>SIGN UP</p></NavLink>}
                    </li>
                    <li className="nav-item">
                    {!props.token && <NavLink to="/login"><p>LOG IN</p></NavLink>}
                    </li>
                </ul>
                </div>
            </div>
            
            </nav>
                <div className="d-flex">
                    <p className="align-self-center pe-2">{props.token && 'Welcome, ' + props.name }</p>
                    {!props.token ? <Link to="/login"><img src='/assets/icoLog.png' alt=""/></Link> : <div id='imgUser' style={{backgroundImage: `url('${props.img}')`}}></div>}
                    <Link className="align-self-center" to="/">{props.token && <img onClick={() => props.logOut()} src='/assets/logOut.png' alt=""/> }</Link>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.usersReducer.token, 
        name: state.usersReducer.name,
        img: state.usersReducer.img
    }

}

const mapDispatchToProps = {
    logOut: usersActions.logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
