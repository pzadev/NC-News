import { useState, useEffect } from "react";
import { postComment } from "../api";
import { useParams } from "react-router";
import { useUser } from "./UserContext";

const CommentPost = ({ setComments }) => {
  const { article_id } = useParams();
  const { loggedInUser } = useUser();
  const [commentRes, setCommentRes] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    commentBody: "",
  });

  
  useEffect(() => {
    if (loggedInUser) {
      setFormData((prevData) => ({
        ...prevData,
        username: loggedInUser.username,
      }));
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, commentBody } = formData;
    postComment(article_id, username, commentBody)
      .then((newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
        setCommentRes("Your comment has been posted successfully!");
      })
      .catch((err) => {
        setFormData({ username: "", commentBody: "" });
        setCommentRes(
          "There was an issue posting your comment. Please log in or use a username already registered."
        );
      });
  };


  return (
    <div>
      {commentRes && <h2>{commentRes}</h2>}
      <form onSubmit={handleSubmit} className="comment-form">
        <h3>Leave a Comment</h3>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loggedInUser ? true : false}
          />
        </div>
        <div className="form-group">
          <label>Comment</label>
          <textarea
            id="commentBody"
            name="commentBody"
            placeholder="Write your comment here..."
            rows="4"
            value={formData.commentBody}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentPost;
