import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-5gcc.onrender.com/api",
});

const getArticles = () => {
  return api.get("/articles").then(({ data }) => {
    const {articles} = data
    return articles
  });
};

const getSingleArticle = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    const {article} = data
    return article
  });
};

const commentsFromArticle = (article_id) => {
    return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
        const {comments} = data
        return comments
      });

}

export { getArticles, getSingleArticle, commentsFromArticle };
