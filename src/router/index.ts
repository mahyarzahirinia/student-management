import { createRouter, createWebHistory } from "vue-router";
import routes from "../routes/mainRoutes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // @ts-ignore
  routes,
});

export default router;
