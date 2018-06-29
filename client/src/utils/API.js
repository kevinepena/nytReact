import axios from "axios";
import filter from "./filter";

export default {

  // gets data from api
  search: function (params) {
    return axios.get("/api/search", { params: filter(params) });
  },
  // saves article to db
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  },
  // gets all saved articles
  getArticles: function () {
    return axios.get("/api/articles");
  },
  // deletes saved article 
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  }
};
