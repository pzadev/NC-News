import { getSingleArticle } from "../api";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    <p>Loading Article...</p>;
  }

  return (
    <>
      <div className="article-single">
        <h2 className="article-title">Article: {article.title}</h2>
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
        <p className="article-votes">Vote Count: {article.votes}</p>
        <p className="article-date">Created At: {article.created_at}</p>
        <p className="article-comment-count">
          {" "}
          Comment Count: {article.comment_count}
        </p>
      </div>
    </>
  );
};

export default SingleArticle;
