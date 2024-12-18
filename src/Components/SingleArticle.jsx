import {
  getSingleArticle,
  updateArticleVotes,
  commentsFromArticle,
} from "../api";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CommentPost from "./CommentPost";
import CommentCard from "./CommentCard";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voteChange, setVoteChange] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    commentsFromArticle(article_id)
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [article_id]);

  useEffect(() => {
    setLoading(true);
    getSingleArticle(article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  const voteUpdater = (change) => {
    if (!hasVoted) {
      setVoteChange((prev) => prev + change);
      setHasVoted(true);
      updateArticleVotes(article.article_id, change)
        .then(() => {})
        .catch((err) => {
          setVoteChange((prev) => prev - change);
          alert("Vote failed, please try again later.");
        });
    }
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    console.log(error);
    return (
      <>
        {error.code} {error.message}
        <p>
          An article with this id doesn't exist... yet! Why don't you write one?
        </p>
      </>
    );
  }

  return (
    <>
      <div className="article-single">
        <h2 className="article-title">Article: {article.title}</h2>
        <p>
          <strong>Written at:</strong>{" "}
          {new Date(article.created_at).toLocaleString()}
        </p>
        <strong>
          <p className="article-author">Written by: {article.author}</p>
          <p className="article-topic">Topic: {article.topic}</p>
        </strong>
        <img
          className="article-image"
          src={article.article_img_url}
          alt={article.title}
        />
        <p className="article-body">{article.body}</p>
        <p className="article-votes">
          Vote Count: {article.votes + voteChange}
        </p>
        <button onClick={() => voteUpdater(1)} disabled={hasVoted}>
          ⬆️ Upvote
        </button>
        <button onClick={() => voteUpdater(-1)} disabled={hasVoted}>
          ⬇️ Downvote
        </button>
        <p className="article-comment-count">
          {" "}
          Comment Count: {article.comment_count}
        </p>
        <CommentPost setComments={setComments} />
        <div className="comment-grid">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.comment_id}>
                <CommentCard comments={comment} setComments={setComments} />
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to add one!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleArticle;
