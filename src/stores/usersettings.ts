import { defineStore } from "pinia";

export const useUserSettings = defineStore("usersettings", {
  state: () => ({
    theme: "green",
    itemsPerPage: "5",
  }),
  getters: {
    currentTheme(state) {
      return state.theme;
    },
    currentItemsPerPage(state) {
      return state.itemsPerPage;
    },
  },
  actions: {
    changeTheme(name: string) {
      return (this.theme = name);
    },
    changeItemsPerPage(itemsNumber: string) {
      return (this.itemsPerPage = itemsNumber);
    },
  },
  persist: {
    storage: localStorage,
    key: "usersettings",
  },
});
