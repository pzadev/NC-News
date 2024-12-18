import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import useQueryParams from "./QueryParams";


const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topicMessage, setTopicMessage] = useState("");
  const queryParams = useQueryParams()
  const topic = queryParams.get("topic")

  useEffect(() => {
    getArticles(topic).then((articles) => {
      if (articles.length > 0){
      setArticles(articles);
      setTopicMessage("")
      } else {
        setArticles([]);
        setTopicMessage(`There are currently no articles with the topic of ${topic}, why don't you write one?`)
      }
    });
  }, [topic]);

  return (
    <>
      <h2>Articles</h2>
      <div className="article-grid">
        {topicMessage ? (
          <p>{topicMessage}</p>
        ) : (
          articles.map((article) => (
            <div key={article.article_id}>
              <ArticleCard article={article} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Articles;
