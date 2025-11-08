import { defineStore } from 'pinia';
import axios from 'axios';

export const useArticleStore = defineStore('acticle', {
  state: () => ({
    articles: [],
    APIURL: "http://127.0.0.1:8000/api/articles",
    token: localStorage.getItem('token')
  }),
  actions: {
    // Fetch all acticle
    async fetchActicle() {
      try {
        const res = await axios.get(this.APIURL);
        
        this.articles = res.data;           

        return this.articles
      } catch (err) {
        console.error(err);
      }
    },
     // Search articles by title or content
    searchArticles(query) {
      if (!query || query.trim() === "") {
        return this.articles; // return all if empty
      }
      const lowerQuery = query.toLowerCase();
      return this.articles.filter(article =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.content.toLowerCase().includes(lowerQuery)
      );
    }
},
});