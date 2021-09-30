import { useState } from "react";
import Activities from "./Activities";
import Comments from "./Comments";
import itinerariesActions from '../redux/actions/itinerariesActions'
import {connect} from 'react-redux'

const Itinerary = (props) => {
  const [visible, setVisible] = useState(false);
  const [countLikes, setCountLikes] = useState(props.itinerary.likes)

  const likes = async () => {
    if (!props.token) {
      alert('You need to log in to like an itinerary')
    } else {
      try {
        let response = await props.likes(props.itinerary._id, props.token) 
        if(response.success) {
          setCountLikes(response.response)
        } else {
          throw new Error ("Something went wrong")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="itineraryContainer">
      <h4>{props.itinerary.name}</h4>
      <div className="likes">
                <p>{countLikes.length}</p>
                <div onClick={likes}>
                  <img src="/assets/likes.png" alt="" />
                </div>
               
          </div>
        <div className="box1">
          <div className="itineraryImg" style={{ backgroundImage: `url('${props.itinerary.img}')` }}></div>
          <div className="infoContainer">
              <div>
                   <h5>{props.itinerary.description}</h5>
              </div>
              <span className="hashtags">{props.itinerary.hashtags.map((hashtag, index) => (<p key={index}>{hashtag}</p>))}</span>
              <div className="author">
                  <img src={props.itinerary.authorImg} alt="" />
                  <h5>{props.itinerary.authorName}</h5>  
              </div> 
            <div className="cost-duration">
              <div>
              <p>Cost:{" "}{[...Array(props.itinerary.cost)].map((cost, index) => <img src="/assets/money.png" alt="" key={index}/>)}</p>
              
              </div>
              <div className="duration">
              <img src="/assets/hours.png" alt="" />
              <p>{props.itinerary.duration} hours.</p>
              </div>
            </div>
          </div>
        </div>
            {visible && 
            <div>
              <Activities itinerary={props.itinerary._id} />
              <Comments itinerary={props.itinerary._id} />
            </div>}
            <button onClick={() => setVisible(!visible)}>
                  {visible ? "VIEW LESS" : "VIEW MORE"}
            </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.usersReducer.token,
  }
}

const mapDispatchToProps = {
  likes: itinerariesActions.likes,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);


/* import { useState } from "react";
import Activities from "./Activities";
import Comments from "./Comments";
import itinerariesActions from '../redux/actions/itinerariesActions'
import {connect} from 'react-redux'

const Itinerary = (props) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState

  return (
    <>
      <div className="itineraryContainer">
      <h4>{props.itinerary.name}</h4>
      <div className="likes">
                <p>{props.itinerary.likes}</p>
                <img src="/assets/likes.png" alt="" />
          </div>
        <div className="box1">
          <div className="itineraryImg" style={{ backgroundImage: `url('${props.itinerary.img}')` }}></div>
          <div className="infoContainer">
              <div>
                   <h5>{props.itinerary.description}</h5>
              </div>
              <span className="hashtags">{props.itinerary.hashtags.map((hashtag, index) => (<p key={index}>{hashtag}</p>))}</span>
              <div className="author">
                  <img src={props.itinerary.authorImg} alt="" />
                  <h5>{props.itinerary.authorName}</h5>  
              </div> 
            <div className="cost-duration">
              <div>
              <p>Cost:{" "}{[...Array(props.itinerary.cost)].map((cost, index) => <img src="/assets/money.png" alt="" key={index}/>)}</p>
              
              </div>
              <div className="duration">
              <img src="/assets/hours.png" alt="" />
              <p>{props.itinerary.duration} hours.</p>
              </div>
            </div>
          </div>
        </div>
            {visible && 
            <div>
              <Activities itinerary={props.itinerary._id} />
              <Comments itinerary={props.itinerary._id} />
            </div>}
            <button onClick={() => setVisible(!visible)}>
                  {visible ? "VIEW LESS" : "VIEW MORE"}
            </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
  }
}

const mapDispatchToProps = {
  likes: itinerariesActions.likes
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary); */
