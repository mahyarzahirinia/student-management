import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import print from "vue3-print-nb";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";
import "@mdi/font/css/materialdesignicons.css";

import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";

const app = createApp(App);
const vuetify = createVuetify({
  icons: { defaultSet: "mdi" },
  components,
  directives,
  theme: { themes: { light: lightTheme, dark: darkTheme } },
});

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(print);
app.use(vuetify);
app.use(pinia);
app.use(router);
app.use(Vue3PersianDatetimePicker, {
  name: "Vue3PersianDatetimePicker",
  props: {
    format: "YYYY-MM-DD HH:mm",
    displayFormat: "jYYYY-jMM-jDD",
    editable: false,
    inputClass: "form-control my-custom-class-name",
    placeholder: "Please select a date",
    altFormat: "YYYY-MM-DD HH:mm",
    color: "#00acc1",
    autoSubmit: false,
    //...
    //... And whatever you want to set as default.
    //...
  },
});

app.mount("#app");
