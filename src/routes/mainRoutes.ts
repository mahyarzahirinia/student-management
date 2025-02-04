import { type RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StudentsManagementView from "../views/StudentsManagementView.vue";

export type Node = Omit<RouteRecordRaw, "children"> & {
  visibility?: "hidden" | "visible";
  icon?: string;
  label: string;
  children?: Node[];
};

const routes: Node[] = [
  {
    visibility: "hidden",
    path: "/print",
    name: "print",
    label: "پرینت",
    component: () => import("@/views/PrintView.vue"),
  },
  {
    icon: "mdi-school",
    label: "لیست دانشجویان",
    path: "/students-management",
    name: "students-management",
    component: StudentsManagementView,
    children: [
      {
        path: "/students-management/sub-route1",
        name: "sub-route",
        label: "ساب روت ۱",
        component: () => import("@/components/SubRoute.vue"),
        children: [
          {
            label: "مینی روت",
            path: "/students-management/sub-route/mini-route",
            name: "mini-route",
            component: () => import("@/components/MiniRoute.vue"),
          },
        ],
      },
      {
        label: "ساب روت ۲",
        path: "/students-management/sub-route2",
        name: "sub-route2",
        component: () => import("@/components/SubRoute.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    icon: "mdi-home",
    label: "صفحه اصلی",
  },
  {
    icon: "mdi-information",
    label: "درباره ما",
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"), //lazy loading
  },
];

export default routes;
