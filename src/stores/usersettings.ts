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
  state: () => ({
    ...userSettingsInit,
  }),
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
    revertStore(state: UserSettingsInit) {
      return (this.$state = {
        ...userSettingsInit,
      });
    },
    setStore(state: UserSettingsInit) {
      return (this.$state = state);
    },
  },
  persist: {
    storage: localStorage,
    key: "usersettings",
  },
});
