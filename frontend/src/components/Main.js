import {NavLink} from 'react-router-dom'

const Main = (props) => {
    return (
        <main>
            <div id='hero' style={{backgroundImage: "url('/assets/hero1.jpg')"}}>
                <div className='insideHero'>
                    <img src='/assets/mytineraryLogo.png' alt=""/>    
                    <h2>Find your perfect trip, designed by insiders who know and love their cities!</h2>
                    <NavLink to="/cities"><button>START DREAMING</button></NavLink>
                </div>
            </div>
            <div className='section'>
                <h2>{props.title}</h2>
            </div>
        </main>
    )
}

export default Main