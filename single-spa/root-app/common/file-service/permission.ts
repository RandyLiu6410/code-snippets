export type PermissionType = "ReadWrite" | "Read";

export type PermissionScope = "Global" | "Group" | "Private";

export interface PermissionConfig {
  idx: string[];
  emails: string[];
}

export interface IPermission {
  id: string;
  clientId: string;
  objId: string;
  creatorId?: string;
  scope: PermissionScope;
  type: PermissionType;
  config: PermissionConfig;
}
