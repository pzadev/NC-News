import { useEffect, useState } from "react";
import { getArticles} from "../api";
import ArticleCard from "./ArticleCard";
import useQueryParams from "../QueryParams";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topicMessage, setTopicMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const queryParams = useQueryParams();
  const topic = queryParams.get("topic");
  const validSorting = ["created_at", "author", "comment_count", "votes"];
  const [sorting, setSorting] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setLoading(true);
    getArticles(topic, sorting, order).then((articles) => {
      if (articles.length > 0) {
        setArticles(articles);
        setLoading(false);
        setTopicMessage("");
      } else {
        setArticles([]);
        setLoading(false);
        setTopicMessage(
          `There are currently no articles with the topic of ${topic}, why don't you write one?`
        );
      }
    });
  }, [topic, sorting, order]);

  if (loading) {
    return (
      <>
        {" "}
        <h2>Loading Articles...</h2>
        <div className="lottie-container">
          <Lottie animationData={loadingAnimation}
          style={{ width: "500px", height: "400px" }} />
        </div>
      </>
    );
  }

  return (
    <>
      <header>
        <h2 className="article-header">Articles</h2>
      </header>
      <section className="article-sorting-container">
        <section className="article-sorting">
          <label htmlFor="sort-select">Sort by</label>
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
        </section>
        <section className="order-select">
          <label htmlFor="order-select">Order by</label>
          <select
            id="order-select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value={"DESC"}>descending</option>
            <option value={"ASC"}>ascending</option>
          </select>
        </section>
      </section>
      <main className="article-grid">
        {topicMessage ? (
          <p>{topicMessage}</p>
        ) : (
          articles.map((article) => (
            <article key={article.article_id}>
              <ArticleCard article={article} />
            </article>
          ))
        )}
      </main>
    </>
  );
};

export default Articles;
