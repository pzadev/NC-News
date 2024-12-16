import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articles) => {
        setArticles(articles)
    });
  }, []);

  return (
    <>
      <h2>Articles</h2>
      <div className="article-grid">
      {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
        </div>
    </>
  );
};

export default Articles;
