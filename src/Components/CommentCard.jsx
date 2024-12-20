import { deleteComment } from "../api";
import { useUser } from "../Components/UserContext";
import { useState, useEffect } from "react";
import { getUsers } from "../api";

const CommentCard = ({ comments, setComments }) => {
  const { loggedInUser } = useUser();
  const [feedback, setFeedback] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [commentAuthorAvatar, setCommentAuthorAvatar] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (users && comments) {
      const user = users.find((user) => user.username === comments.author);
      if (user) {
        setCommentAuthorAvatar(user.avatar_url);
      }
    }
  }, [comments, users]);

  const handleDelete = () => {
    setIsLoading(true);
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (isConfirmed) {
      deleteComment(comments.comment_id)
        .then(() => {
          setComments((prevComments) =>
            prevComments.filter(
              (comment) => comment.comment_id !== comments.comment_id
            )
          );
          setIsLoading(false);
          setFeedback("Comment successfully deleted!");
          setTimeout(() => {
            setFeedback("");
          }, 3000);
        })
        .catch((err) => {
          setIsLoading(false);
          setFeedback("Failed to delete the comment. Please try again.");
        });
    }
  };

  if (loading) {
    return <h2>Loading comments...</h2>;
  }

  return (
    <article className="comment-card">
      <header style={{ display: "flex", alignItems: "center" }}>
        {commentAuthorAvatar ? (
          <img
            src={commentAuthorAvatar}
            alt={`${comments.author}'s avatar`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
        ) : (
          <img
            src="/default-avatar.png"
            alt="Default Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
        )}
        <p>
          <strong>{comments.author}</strong> commented
        </p>
      </header>
      <section>
        <p>{comments.body}</p>
        <p>
          <strong>Written at:</strong>{" "}
          {new Date(comments.created_at).toLocaleString()}
        </p>
      </section>
      <footer>
        {loggedInUser?.username === comments.author ? (
          <button onClick={handleDelete}>Delete Comment</button>
        ) : null}
      </footer>
      {feedback && <p>{feedback}</p>}
    </article>
  );
};
export default CommentCard;
