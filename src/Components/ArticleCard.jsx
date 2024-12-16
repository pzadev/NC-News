import { Link } from "react-router";

const ArticleCard = ({ article }) => {
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
        <strong><p className="article-author">Written by: {article.author}</p>
        <p className="article-topic">Topic: {article.topic}</p></strong>
        <p className="article-votes">Vote Count: {article.votes}</p>
        <p className="article-date">Created At: {article.created_at}</p>
        <p className="article-comment-count"> Comment Count: {article.comment_count}</p>
      </div>
    </section>
  );
};

export default ArticleCard;