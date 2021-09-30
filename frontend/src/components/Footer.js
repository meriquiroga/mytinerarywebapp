import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const Footer = (props) => {
    return (
        <footer>
            <p>Copyright 2021 | mytinerary.com</p>
            <div className='footerNav'>
                <NavLink exact to="/"><p>HOME</p></NavLink>
                <NavLink to="/cities"><p>CITIES</p></NavLink>
                {!props.token && <NavLink to="/signup"><p>SIGN UP</p></NavLink>}
                {!props.token && <NavLink to="/login"><p>LOG IN</p></NavLink>}
            </div>
            <div className='contact'>
                <p>Contact us: </p>
                <a href="https://wa.me/123456789" target="_blank" rel="noreferrer">+1 123 456 789</a>
                <span> | </span>
                <a href="mailto:info@mytinerary.com">info@mytinerary.com</a>
            </div>
        </footer>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.usersReducer.token, 
    }
}

export default connect(mapStateToProps)(Footer)