import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import useQueryParams from "./QueryParams";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topicMessage, setTopicMessage] = useState("");
  const queryParams = useQueryParams();
  const topic = queryParams.get("topic");
  const validSorting = ["created_at", "author", "comment_count", "votes"];
  const [sorting, setSorting] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    getArticles(topic, sorting, order).then((articles) => {
      if (articles.length > 0) {
        setArticles(articles);
        setTopicMessage("");
      } else {
        setArticles([]);
        setTopicMessage(
          `There are currently no articles with the topic of ${topic}, why don't you write one?`
        );
      }
    });
  }, [topic, sorting, order]);

  return (
    <>
      <h2>Articles</h2>
      <div className="article-sorting">
        <label>Sort by</label>
        <select
          id="sort-select"
          value={sorting}
          onChange={(e) => setSorting(e.target.value)}
        >
          {validSorting.map((sortingMethod, index) => (
            <option key={index} value={sortingMethod}>
              {sortingMethod}
            </option>
          ))}
        </select>
      </div>
      <div className="order-select">
        <label>Order by</label>
        <select
          id="sort-select"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value={"DESC"}>descending</option>
          <option value={"ASC"}>ascending</option>
        </select>
      </div>
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
