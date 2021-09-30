import { useState } from "react";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const Comments = (props) => {
  const [comments, setComments] = useState(props.itinerary.comments);
  const [newComment, setNewComment] = useState({ comment: "" });

  const inputHandler = (e) => {
    setNewComment({
      ...newComment,
      comment: e.target.value,
    });
  };

  const commentSubmit = async () => {
    if (!props.token) {
      toast("You need to log in to write a comment", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        let response = await props.addComment(
          props.itinerary._id,
          newComment,
          props.token
        );
        if (response.success) {
          setComments(response.response);
        } else {
          console.log(response.response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* var commentsMap = comments.map((comment) => {
    return (              
        <p>{comment}</p>       
    );
  }) */

  return (
    <>
      <div className="commentsContainer">{/* {commentsMap} */}</div>
      <div className="inputsBox">
        <form>
          <input
            className="inputComments"
            type="textarea"
            name="comment"
            value={newComment.comment}
            placeholder="Leave a comment"
            onChange={inputHandler}
          />
          <button onClick={commentSubmit}>SEND</button>
          <img src="/assets/edit.png" alt="" />
          <img src="/assets/delete.png" alt="" />
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.usersReducer.token,
    name: state.usersReducer.name,
    surname: state.usersReducer.surname,
    _id: state.usersReducer._id,
  };
};

const mapDispatchToProps = {
  addComment: itinerariesActions.addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
