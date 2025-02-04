import { type Node } from "@/routes/mainRoutes";

export const isNodeParent = (node: any) => {
  return !(Array.isArray(node?.children) && node?.children?.length !== 0);
};

export const isNodeVisible = (node: any) => {
  return node?.visibility !== "hidden";
};
