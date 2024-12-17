import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-5gcc.onrender.com/api",
});

const getArticles = () => {
  return api.get("/articles").then(({ data }) => {
    const { articles } = data;
    return articles;
  });
};

const getSingleArticle = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    const { article } = data;
    return article;
  });
};

const commentsFromArticle = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    const { comments } = data;
    return comments;
  });
};

const updateArticleVotes = (article_id, voteChange) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: voteChange })
    .then(({ data }) => {
      console.log(data);
      const { article } = data;
      return article;
    });
};

const postComment = (article_id, username, commentBody) => {
  return api
    .post(`/articles/${article_id}/comments`, {
      username: username,
      body: commentBody,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(
        "There was an issue posting the comment. Please try again."
      );
    });
};

export {
  getArticles,
  getSingleArticle,
  commentsFromArticle,
  updateArticleVotes,
  postComment,
};
