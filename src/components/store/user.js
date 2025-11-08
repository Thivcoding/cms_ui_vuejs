import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    APIURL: "http://127.0.0.1:8000/api/users",
    token: localStorage.getItem('token')
  }),
  actions: {
    async fetchUsers() {
      const res = await axios.get(this.APIURL, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.users = res.data
      // console.log(res.data);
      
    },
  }
})
