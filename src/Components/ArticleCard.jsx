import { Link } from "react-router";
import { useState } from "react";
import { updateArticleVotes } from "../api";

const ArticleCard = ({ article }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

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

  return (
    <section className="article-card">
      <img
        className="article-image"
        src={article.article_img_url}
        alt={article.title}
      />
      <div className="article-block">
        <Link to={`/articles/${article.article_id}`}>
          <h2 className="article-title">Article: {article.title}</h2>
        </Link>
        <p>Written at: {new Date(article.created_at).toLocaleString()}</p>
        <strong>
          <p className="article-author">Written by: {article.author}</p>
          <p className="article-topic">Topic: {article.topic}</p>
        </strong>
        <p className="article-votes">
          Vote Count: {article.votes + voteChange}
        </p>
        <p></p>
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
      </div>
    </section>
  );
};

export default ArticleCard;
