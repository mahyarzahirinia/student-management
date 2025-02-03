export type Link = {
  icon?: string;
  path: string;
  label: string;
};

const links: Link[] = [
  { icon: "mdi-home", path: "/", label: "صفحه اصلی" },
  { icon: "mdi-information", path: "/about", label: "درباره ما" },
  { icon: "mdi-school", path: "/students-management", label: "لیست دانشجویان" },
];

export default links;
