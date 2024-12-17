import { deleteComment } from "../api";
import { useUser } from "../Components/UserContext";
import { useState } from "react";

const CommentCard = ({ comments, setComments }) => {
  const { loggedInUser } = useUser();
  const [feedback, setFeedback] = useState("");
  const [loading, setIsLoading] = useState(false)

  const handleDelete = () => {
    setIsLoading(true)
    const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
    if (isConfirmed){
    deleteComment(comments.comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.comment_id !== comments.comment_id
          )
        );
        setIsLoading(false)
        setFeedback("Comment successfully deleted!");
        setTimeout(() => {
          setFeedback(""); 
        }, 3000);
      })
      .catch((err) => {
        setIsLoading(false)
        setFeedback("Failed to delete the comment. Please try again.");
      });
  };
}

if (loading){
  return <p>Processing request...</p>
}

  return (
    <div className="comment-card">
      <p>
        <strong>Author:</strong> {comments.author}
      </p>
      <p>{comments.body}</p>
      <p>
        <strong>Votes:</strong> {comments.votes}
      </p>
      <p>
        <strong>Written at:</strong>{" "}
        {new Date(comments.created_at).toLocaleString()}
      </p>
      {loggedInUser === comments.author && (
        <button onClick={handleDelete}>Delete Comment</button>
      )}
       {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default CommentCard;
