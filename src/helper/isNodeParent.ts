import { type Node } from "@/routes/mainRoutes";

export const isNodeParent = (node: Node) => {
  return Array.isArray(node?.children) && node?.children?.length !== 0;
};
