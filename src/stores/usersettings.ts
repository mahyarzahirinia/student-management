import { defineStore } from "pinia";

export const useUserSettings = defineStore("usersettings", {
  state: () => ({
    theme: "green",
  }),
  getters: {
    currentTheme(state) {
      return state.theme;
    },
  },
  actions: {
    changeTheme(name: string) {
      return (this.theme = name);
    },
  },
  persist: {
    storage: localStorage,
    key: "usersettings",
  },
});
