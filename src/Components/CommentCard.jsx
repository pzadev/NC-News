const CommentCard = ({ comments }) => {

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
          <strong>Written at:</strong> {new Date(comments.created_at).toLocaleString()}
        </p>
      </div>
    );
  };
  
  export default CommentCard;
  