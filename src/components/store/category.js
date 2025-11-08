import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    APIURL: "http://127.0.0.1:8000/api/categories",
    token: localStorage.getItem('token')
  }),
  actions: {
    // Fetch all categories
    async fetchCategories() {
      try {
        const res = await axios.get(this.APIURL);
        this.categories = res.data.data;   
        // console.log(res.data.data);
        return res.data.data
      } catch (err) {
        console.error(err);
      }
    },
},
});
