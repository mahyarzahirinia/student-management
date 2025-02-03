import links, { type Link } from "./mainLinks";
import { type RouteRecordRaw as Route } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StudentsManagementView from "../views/StudentsManagementView.vue";

const routes: (Route & { visibility?: "hidden" | "show" | undefined })[] = [
  {
    visibility: "hidden",
    path: "/print",
    name: "print",
    component: () => import("@/views/PrintView.vue"),
  },
  {
    path: "/students-management",
    name: "students-management",
    component: StudentsManagementView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"), //lazy loading
  },
];

// notes
// object.assign adds an object to another
// map is a pair of key value with the insertion order intact
// create a map, then set or get to/from it

const mergeRoutesLinks = (allRoutes: Route[], allLinks: Link[]) => {
  const map = new Map<string, any>();

  for (const route of allRoutes) {
    map.set(route.path, { ...route });
  }

  for (const link of links) {
    if (map.has(link.path)) {
      Object.assign(map.get(link.path), link);
    } else {
      map.set(link.path, { ...link });
    }
  }

  // create an array from the merged arrays
  return Array.from(map.values());
};

const merged = mergeRoutesLinks(routes, links);
console.log("merged", merged);

export default merged;
