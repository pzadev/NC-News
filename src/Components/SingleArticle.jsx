import { getSingleArticle, updateArticleVotes } from "../api";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [voteChange, setVoteChange] = useState(0);
  const [hasVoted, setHasVoted] = useState(false)

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
      updateArticleVotes(article.article_id, change)
        .then(() => {
          setHasVoted(true);
        })
        .catch((err) => {
          setVoteChange((prev) => prev - change);
          alert("Vote failed, please try again later.")
        });
    }
  };

  if (loading){
    return <p>Loading ...</p>
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
        <button onClick={() => voteUpdater(1)} disabled={hasVoted}>⬆️ Upvote</button>
        <button onClick={() => voteUpdater(-1)}disabled={hasVoted}>⬇️ Downvote</button>
        <p className="article-comment-count">
          {" "}
          Comment Count: {article.comment_count}
        </p>
      </div>
    </>
  );
};

export default SingleArticle;
