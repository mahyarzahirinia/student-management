import { defineStore } from "pinia";
import { changeFont } from "../helper/changeFont";

export const useUserSettings = defineStore("usersettings", {
  state: () => ({
    theme: "green",
    itemsPerPage: "5",
    isPersianNumbers: true,
  }),
  getters: {
    currentTheme(state) {
      return state.theme;
    },
    currentItemsPerPage(state) {
      return state.itemsPerPage;
    },
    currentIsPersianNumbers(state) {
      return state.isPersianNumbers;
    },
  },
  actions: {
    changeTheme(name: string) {
      return (this.theme = name);
    },
    changeItemsPerPage(itemsNumber: string) {
      return (this.itemsPerPage = itemsNumber);
    },
    changeIsPersianNumbers(isPersianNumbers: boolean) {
      changeFont(isPersianNumbers);
      return (this.isPersianNumbers = isPersianNumbers);
    },
  },
  persist: {
    storage: localStorage,
    key: "usersettings",
  },
});
