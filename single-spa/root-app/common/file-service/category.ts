export const CategoryTypes = ["file", "component", "template"] as const;
export type CategoryType = typeof CategoryTypes[number];

export type CategoryColumnType = "text" | "number" | "link";

export interface CategoryColumn {
  name: string;
  type: CategoryColumnType;
}

export interface CategoryInfo {
  folderId?: string;
}

export interface ICategory {
  id: string;
  clientId: string;
  type: CategoryType;
  name: string;
  creatorId: string;
  columns: CategoryColumn[];
  info?: CategoryInfo;
}
