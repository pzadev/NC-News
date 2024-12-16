import axios from "axios";

const api = axios.create({
  baseURL: "https://news-api-5gcc.onrender.com/api",
});


const getArticles = () => {
    return api.get("/articles").then(({ data }) => {
      return data.articles;
    });
  };



export {getArticles}
