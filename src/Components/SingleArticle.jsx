import { getSingleArticle, commentsFromArticle } from "../api";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
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


  useEffect(() => {
    commentsFromArticle(article_id)
      .then((comments) => {
        console.log(comments, "SA30")
        setComments(comments);
      })
      .catch((err) => {
        console.error(err);
      })
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
        <div className="comment-grid">
        {comments.map((comment) => (
          <div key={comment.comment_id}>
              <CommentCard key={comment.comment_id} comments={comment} />
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default SingleArticle;
