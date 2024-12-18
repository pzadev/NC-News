import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-5gcc.onrender.com/api",
});

const getArticles = (query, sorting, order) => {
  const params = [];

  if (query) params.push(`topic=${query}`);
  if (sorting) params.push(`sort_by=${sorting}`);
  if (order) params.push(`order=${order}`);

  const url = `/articles${params.length ? `?${params.join("&")}` : ""}`;

  return api.get(url).then(({ data }) => {
    const { articles } = data;
    return articles;
  });
};

const getUsers = () => {
  return api.get("/users").then(({ data }) => {
    const { users } = data;
    return users;
  });
};

const getTopics = () => {
  return api.get("/topics").then(({ data }) => {
    return data;
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
      const { comment } = data;
      return comment;
    })
    .catch((err) => {
      throw new Error(
        "There was an issue posting the comment. Please try again."
      );
    });
};

const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`);
};

export {
  getArticles,
  getTopics,
  getSingleArticle,
  commentsFromArticle,
  updateArticleVotes,
  postComment,
  getUsers,
  deleteComment,
};
