import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    currentUser: (state) => state.user,
  },
  actions: {
    login(user) {
      this.loggedIn = true;
      this.user = user;
      console.log("Token", user.accessToken)
      console.log(user)
    },
    logout() {
      this.loggedIn = false;
      this.user = null;
      // Remove user state from localStorage
      localStorage.removeItem('user');
    },
    initializeUserState() {
      // Check if user state exists in localStorage on app startup
      const userState = localStorage.getItem('user');
      if (userState) {
        this.loggedIn = true;
        this.user = JSON.parse(userState);
        localStorage.setItem('token', this.currentUser.accessToken)
      }
    },
  },
});

