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

const updateArticleVotes = (article_id, voteChange) => {
    return api.patch(`/articles/${article_id}`, { inc_votes: voteChange })
      .then(({ data }) => {
        console.log(data)
        const {article} = data
        return article;
      });
  };

// Error testing for updateVotes API 

// const updateArticleVotes = (article_id, change) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new Error("Failed to update vote"));
//     }, 1000);
//   });
// };

export { getArticles, getSingleArticle, commentsFromArticle, updateArticleVotes };
