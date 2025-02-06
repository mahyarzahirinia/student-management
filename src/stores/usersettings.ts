import { defineStore } from "pinia";
import { changeFont } from "../helper/changeFont";
import {
  type SelectsInit,
  type SwitchesInit,
  type UserSettingsInit,
  selectsInit,
  switchesInit,
  userSettingsInit,
} from "@/stores/usersettingsData";

export const useUserSettings = defineStore("usersettings", {
  state: () => userSettingsInit,
  getters: {
    currentTheme(state: UserSettingsInit) {
      return state.selects.template.selected;
    },
    currentItemsPerPage(state) {
      return state.selects.itemsPerPage.selected;
    },
    currentIsPersianNumbers(state) {
      return state.switches.isPersianNumbers;
    },
  },
  actions: {
    changeTheme(name: string) {
      return (this.selects.template.selected = name);
    },
    changeItemsPerPage(itemsNumber: string) {
      return (this.selects.itemsPerPage.selected = itemsNumber);
    },
    changeIsPersianNumbers(isPersianNumbers: boolean) {
      changeFont(isPersianNumbers);
      return (this.switches.isPersianNumbers.selected = isPersianNumbers);
    },
  },
  persist: {
    storage: localStorage,
    key: "usersettings",
  },
});
