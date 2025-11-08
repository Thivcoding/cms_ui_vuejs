import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [],
    APIURL: "http://127.0.0.1:8000/api/comments",
    token: localStorage.getItem('token')
  }),

  actions: {
    // 🔹 Fetch all comments
    async fetchComments() {
      try {
        const res = await axios.get(this.APIURL, {
         
        });
        console.log(res.data);
        
        this.comments = res.data;
        return res.data;
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        throw new Error(err.response?.data?.message || "Failed to fetch comments");
      }
    },

    // 🔹 Add new comment
    async addComment(data) {
      try {
        const res = await axios.post(this.APIURL, data, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          }
        });
        this.comments.push(res.data.data);
        return res.data.message;
      } catch (err) {
        console.error("Failed to add comment:", err);
        throw new Error(err.response?.data?.message || "Failed to add comment");
      }
    },

     async updateComment(id, data) {
      try {
        const res = await axios.put(`${this.APIURL}/${id}`, data, {
          headers: this.token ? { Authorization: `Bearer ${this.token}` } : {}
        });
        // update local store
        const index = this.comments.findIndex(c => c.id === id);
        if (index !== -1) this.comments[index] = res.data.comment;
        return res.data.message;
      } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to update comment");
      }
    },
  },
});
