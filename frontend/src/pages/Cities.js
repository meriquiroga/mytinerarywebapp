import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'

const Cities = (props) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function getAllCities() {
      try {
        await props.getAllCities()
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
    getAllCities()
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (loading) {
    return <div className="contenedor">
              <div className='city' style={{backgroundImage: "url('/assets/hero.jpg')"}}>
                      <div className='insideCities'> 
                          <h3>Find your next adventure</h3>
                      </div>
              </div>
              <h2 className="loading">Loading...</h2>
           </div>       
  }

   var filteredMap = props.filtered.map((city) => {
    return (              
        <Link key={city.name} to={`/city/${city._id}`}>
          <div  className="citiesCards" style={{ backgroundImage: `url('${city.src}')` }}>
            <div>
              <h4 className="hCards">{city.name}</h4>
              <p className="pCards">{city.country}</p>
            </div>
          </div>
        </Link>
    );
  })

  return (
    <>
      <div className="contenedor">
        <div className='city' style={{backgroundImage: "url('/assets/hero.jpg')"}}>
                <div className='insideCities'> 
                    <h3>Find your next adventure</h3>
                </div>
        </div>
        <div className="buscador">
          <input className="searchInput" type="text" name="search" placeholder="Search by destination" onChange={(e) => props.filterCities(e)}/>
        </div>
        <div className="cardsContainer">
        {props.filtered.length > 0 ? filteredMap :  
          <div className="sorry">
            <img src='/assets/sorry.png' alt=""/> 
            <h2>We're sorry!</h2>
            <h3>We don't have that city yet...</h3>
            <p>Please try a different one</p>
          </div>
        }
        </div>
        <div className="buscador">
          <Link to="/">
            <button>BACK TO HOME</button>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cities: state.citiesRedux.cities,
    filtered: state.citiesRedux.filtered
  }
}

const mapDispatchToProps = {
  getAllCities: citiesActions.getCities,
  filterCities: citiesActions.filterCities
}

export default connect(mapStateToProps, mapDispatchToProps) (Cities);
