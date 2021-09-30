import { useState } from "react";
import activitiesActions from '../redux/actions/activitiesActions'
import { useEffect } from "react";
import {connect} from 'react-redux'

const Activities = (props) => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    async function getActivities() {
      try {
        const response = await props.getActivities(props.itinerary)
        setActivities(response.data.response)
      } catch (error) {
        alert(error)
      } /* finally {
        setLoading(false)
      } */
    }
    getActivities(props.itinerary)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  var activitiesMap = activities.map((activity) => {
    return (              
      <div key={activity._id} className="activityImg" style={{ backgroundImage: `url('${activity.img}')` }}>
      <p>{activity.name}</p>
      </div>
    );
  })

  return (
    <>
      <div className="activitiesContainer">
      {activities.length > 0 ? activitiesMap :  
          <div className="sorry">
            <img src='/assets/sorry.png' alt=""/> 
            <h2>We're sorry!</h2>
            <h3>We don't have any activities yet...</h3>
            <p>Please try again soon</p>
          </div>
        }
      </div>
    </>
  );
};

const mapDispatchToProps = {
  getActivities: activitiesActions.getActivities,
}

export default connect(null, mapDispatchToProps)(Activities);
