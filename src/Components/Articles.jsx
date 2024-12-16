import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router";
import ArticleCard from "./ArticleCard";
import SingleArticle from "./SingleArticle"

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <>
      <h2>Articles</h2>
      <div className="article-grid">
        {articles.map((article) => (
          <div key={article.article_id}>
              <ArticleCard key={article.article_id} article={article} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Articles;
