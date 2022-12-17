export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AccessToken = {
  __typename?: "AccessToken";
  expiredAt: Scalars["DateTime"];
  id: Scalars["Int"];
  platform?: Maybe<Platform>;
  platformId?: Maybe<Scalars["String"]>;
  token: Scalars["String"];
  user: User;
  userId: Scalars["String"];
};

export enum Admin {
  Platform = "PLATFORM",
  System = "SYSTEM",
}

export type CreateGroupInput = {
  /** 組織類別(各平台自定義) */
  category?: InputMaybe<Scalars["String"]>;
  /** 組織描述 */
  description?: InputMaybe<Scalars["String"]>;
  /** 組織顯示名稱 */
  displayName?: InputMaybe<Scalars["String"]>;
  /** 組識資訊 */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 組織名稱 */
  name: Scalars["String"];
  /** 上層組織ID */
  parentGroupId?: InputMaybe<Scalars["Int"]>;
  platformId: Scalars["Int"];
  projectId: Scalars["Int"];
};

export type CreatePlatformInput = {
  /** 平台描述 */
  description?: InputMaybe<Scalars["String"]>;
  /** 平台資訊/自定義資訊 */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 平台名稱 */
  name: Scalars["String"];
};

export type CreateProjectInput = {
  /** 項目描述 */
  description?: InputMaybe<Scalars["String"]>;
  enable: Scalars["Boolean"];
  /** 項目資訊(自定義資訊) */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 項目名稱 */
  name: Scalars["String"];
  platformId: Scalars["Int"];
};

export type CreateServiceInput = {
  /** 微服務描述 */
  description?: InputMaybe<Scalars["String"]>;
  /** 啟用 */
  enable: Scalars["Boolean"];
  /** 微服務資訊/自定義資訊 */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 微服務名稱 */
  name: Scalars["String"];
  /** 微服務類型 */
  type: Type;
};

export type CreateUserInput = {
  /** 顯示名稱 */
  displayName?: InputMaybe<Scalars["String"]>;
  /** 使用者Email, 同一平台內不得重複 */
  email: Scalars["String"];
  /** 性別 */
  gender: Gender;
  /** 群組ID */
  groupId?: InputMaybe<Scalars["Int"]>;
  /** 此為平台自定義內容，依JSON形式儲存 */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 使用者姓名 */
  name: Scalars["String"];
  /** 電話 */
  phone?: InputMaybe<Scalars["String"]>;
  platformId?: InputMaybe<Scalars["Int"]>;
  /** 項目ID */
  projectId?: InputMaybe<Scalars["Int"]>;
};

export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
}

export type Group = {
  __typename?: "Group";
  /** 組織類別(各平台自定義) */
  category?: Maybe<Scalars["String"]>;
  children: Array<Group>;
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 組織描述 */
  description?: Maybe<Scalars["String"]>;
  /** 組織顯示名稱 */
  displayName?: Maybe<Scalars["String"]>;
  /** 組織ID */
  id: Scalars["Int"];
  /** 組識資訊 */
  info?: Maybe<Scalars["JSON"]>;
  /** 組織名稱 */
  name: Scalars["String"];
  /** 上層組織ID */
  parentGroupId?: Maybe<Scalars["Int"]>;
  platformId: Scalars["Int"];
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
  users: Array<User>;
};

export type Module = {
  __typename?: "Module";
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 模組ID */
  id: Scalars["Int"];
  /** 模組名稱 */
  name: Scalars["String"];
  permissions: Array<Permission>;
  serviceId: Scalars["Int"];
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
};

export type ModuleInput = {
  id?: InputMaybe<Scalars["Int"]>;
  name: Scalars["String"];
  permissions: Array<PermissionInput>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** 增加模組內權限(一併刪除角色內權限) */
  addPermission: Scalars["Boolean"];
  /** 增加項目之服務 */
  addServiceToProject: Scalars["Boolean"];
  /** 使用者或組織加入項目 */
  addUserOrGroupToProject: Scalars["Boolean"];
  /** 使用者加入群組 */
  addUserToGroup: Scalars["Boolean"];
  /** 管理者登入 */
  adminLogin: AccessToken;
  /** 建立組織 */
  createGroup: Group;
  /** 建立模組與相關權限 */
  createModulesAndPermissions: Scalars["Boolean"];
  /** 建立使用者或組織之權限連結 */
  createPermissionLink: Scalars["Boolean"];
  /** 創建平台 */
  createPlatform: Platform;
  /** 創建項目 */
  createProject: Project;
  /** 創建角色 */
  createRole: Scalars["Boolean"];
  /** 建立使用者或組織角色連結 */
  createRoleLink: Scalars["Boolean"];
  /** 創建服務 */
  createService: Scalars["Boolean"];
  /** 創建使用者() */
  createUser: User;
  /** 刪除平台 */
  deletePlatform: Scalars["Boolean"];
  /** 忘記密碼 */
  forget: Scalars["Boolean"];
  /** 登入 */
  login: AccessToken;
  /** 登出 */
  logout: Scalars["Boolean"];
  /** 移除組織 */
  removeGroup: Scalars["Boolean"];
  /** 刪除模組(會連同模組下方權限一併刪除) */
  removeModule: Scalars["Boolean"];
  /** 刪除權限 */
  removePermission: Scalars["Boolean"];
  /** 移除單項權限之連結 */
  removePermissionLinks: Scalars["Boolean"];
  /** 移除項目 */
  removeProject: Scalars["Boolean"];
  /** 移除角色 */
  removeRole: Scalars["Boolean"];
  /** 移除使用者或組織角色連結 */
  removeRoleLinks: Scalars["Boolean"];
  /** 移除服務 */
  removeService: Scalars["Boolean"];
  /** 移除項目之服務 */
  removeServiceFromProject: Scalars["Boolean"];
  /** 移除使用者 */
  removeUser: Scalars["Boolean"];
  /** 群組內移除使用者 */
  removeUserFromGroup: Scalars["Boolean"];
  /** 使用者或組織移除項目外 */
  removeUserOrGroupFromProject: Scalars["Boolean"];
  /** 更新組織資訊 */
  updateGroup: Scalars["Boolean"];
  /** 更新模組名稱 */
  updateModuleName: Scalars["Boolean"];
  /** 更新模組 */
  updateModules: Scalars["Boolean"];
  /** 更新模組權限 */
  updatePermission: Scalars["Boolean"];
  /** 單獨更新權限連結/停不停用 */
  updatePermissionLink: Scalars["Boolean"];
  /** 更新平台 */
  updatePlatform: Scalars["Boolean"];
  /** 修改單一項目資訊 */
  updateProject: Scalars["Boolean"];
  /** 更新角色資訊 */
  updateRole: Scalars["Boolean"];
  /** 更新角色連結 */
  updateRoleLink: Scalars["Boolean"];
  /** 更新角色權限 */
  updateRolePermissions: Scalars["Boolean"];
  /** 修改服務 */
  updateService: Scalars["Boolean"];
  /** 更新使用者 */
  updateUser: Scalars["Boolean"];
  /** 更新使用者密碼 */
  updateUserPass: Scalars["Boolean"];
  /** 移除使用者或組織角色連結 */
  updateUserRolePermissions: Scalars["Boolean"];
};

export type MutationAddPermissionArgs = {
  description?: InputMaybe<Scalars["String"]>;
  moduleId: Scalars["Int"];
  name: Scalars["String"];
  serviceId: Scalars["Int"];
};

export type MutationAddServiceToProjectArgs = {
  projectId: Scalars["Int"];
  serviceId: Scalars["Int"];
};

export type MutationAddUserOrGroupToProjectArgs = {
  groupId?: InputMaybe<Scalars["Int"]>;
  projectId: Scalars["Int"];
  userId?: InputMaybe<Scalars["Int"]>;
};

export type MutationAddUserToGroupArgs = {
  groupId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type MutationAdminLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateGroupArgs = {
  createGroupInput: CreateGroupInput;
};

export type MutationCreateModulesAndPermissionsArgs = {
  modules: Array<ModuleInput>;
  serviceId: Scalars["Int"];
};

export type MutationCreatePermissionLinkArgs = {
  enable: Scalars["Boolean"];
  groupId?: InputMaybe<Scalars["Float"]>;
  permissionId: Scalars["Float"];
  projectId: Scalars["Float"];
  userId?: InputMaybe<Scalars["Float"]>;
};

export type MutationCreatePlatformArgs = {
  createPlatformInput: CreatePlatformInput;
};

export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};

export type MutationCreateRoleArgs = {
  description: Scalars["String"];
  name: Scalars["String"];
  permissionList?: InputMaybe<Array<RolePermissionInput>>;
  projectId: Scalars["Int"];
};

export type MutationCreateRoleLinkArgs = {
  groupId?: InputMaybe<Scalars["Float"]>;
  roleId: Scalars["Float"];
  userId?: InputMaybe<Scalars["Float"]>;
};

export type MutationCreateServiceArgs = {
  createServiceInput: CreateServiceInput;
};

export type MutationCreateUserArgs = {
  admin: Scalars["Boolean"];
  createUserInput: CreateUserInput;
  file?: InputMaybe<Scalars["Upload"]>;
};

export type MutationDeletePlatformArgs = {
  id: Scalars["Int"];
};

export type MutationForgetArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  platformId: Scalars["Int"];
};

export type MutationLogoutArgs = {
  platformId?: InputMaybe<Scalars["Int"]>;
  userId: Scalars["Float"];
};

export type MutationRemoveGroupArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveModuleArgs = {
  moduleId: Scalars["Int"];
};

export type MutationRemovePermissionArgs = {
  permissionId: Scalars["Int"];
};

export type MutationRemovePermissionLinksArgs = {
  linkIds: Array<Scalars["Int"]>;
};

export type MutationRemoveProjectArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveRoleArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveRoleLinksArgs = {
  linkIds: Array<Scalars["Int"]>;
};

export type MutationRemoveServiceArgs = {
  serviceId: Scalars["Int"];
};

export type MutationRemoveServiceFromProjectArgs = {
  projectId: Scalars["Int"];
  serviceId: Scalars["Int"];
};

export type MutationRemoveUserArgs = {
  id: Scalars["Int"];
};

export type MutationRemoveUserFromGroupArgs = {
  groupId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type MutationRemoveUserOrGroupFromProjectArgs = {
  groupId?: InputMaybe<Scalars["Int"]>;
  projectId: Scalars["Int"];
  userId?: InputMaybe<Scalars["Int"]>;
};

export type MutationUpdateGroupArgs = {
  updateGroupInput: UpdateGroupInput;
};

export type MutationUpdateModuleNameArgs = {
  moduleId: Scalars["Int"];
  name: Scalars["String"];
  serviceId: Scalars["Int"];
};

export type MutationUpdateModulesArgs = {
  modules: Array<ModuleInput>;
  serviceId: Scalars["Int"];
};

export type MutationUpdatePermissionArgs = {
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  permissionId: Scalars["Int"];
};

export type MutationUpdatePermissionLinkArgs = {
  enable: Scalars["Boolean"];
  linkId: Scalars["Float"];
};

export type MutationUpdatePlatformArgs = {
  updatePlatformInput: UpdatePlatformInput;
};

export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectInput;
};

export type MutationUpdateRoleArgs = {
  description: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type MutationUpdateRoleLinkArgs = {
  linkId: Scalars["Float"];
  roleId: Scalars["Float"];
};

export type MutationUpdateRolePermissionsArgs = {
  permissionList: Array<RolePermissionInput>;
  roleId: Scalars["Int"];
};

export type MutationUpdateServiceArgs = {
  updateServiceInput: UpdateServiceInput;
};

export type MutationUpdateUserArgs = {
  file?: InputMaybe<Scalars["Upload"]>;
  updateUserInput: UpdateUserInput;
};

export type MutationUpdateUserPassArgs = {
  password: Scalars["String"];
};

export type MutationUpdateUserRolePermissionsArgs = {
  permissionIds: Array<InputMaybe<Scalars["Int"]>>;
  roleIds: Array<InputMaybe<Scalars["Int"]>>;
  userId: Scalars["Float"];
};

export type Permission = {
  __typename?: "Permission";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type PermissionInput = {
  description: Scalars["String"];
  id?: InputMaybe<Scalars["Int"]>;
  name: Scalars["String"];
};

export type PermissionLink = {
  __typename?: "PermissionLink";
  description?: Maybe<Scalars["String"]>;
  enable: Scalars["Boolean"];
  id: Scalars["Int"];
  linkId: Scalars["Float"];
  name: Scalars["String"];
};

export type PermissionLinks = {
  __typename?: "PermissionLinks";
  /** 是否啟用 */
  enable: Scalars["Boolean"];
  /** 組織ID */
  groupId?: Maybe<Scalars["Int"]>;
  /** 關連權限ID */
  id: Scalars["Int"];
  /** 權限ID */
  permissionId: Scalars["Int"];
  /** 項目ID */
  projectId: Scalars["Int"];
  /** 使用者ID */
  userId?: Maybe<Scalars["Int"]>;
};

export type PermissionUserGroup = {
  __typename?: "PermissionUserGroup";
  description?: Maybe<Scalars["String"]>;
  grouplinks: Array<PermissionLinks>;
  id: Scalars["Int"];
  name: Scalars["String"];
  userlinks: Array<PermissionLinks>;
};

export type Platform = {
  __typename?: "Platform";
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 平台描述 */
  description?: Maybe<Scalars["String"]>;
  /** 平台ID */
  id: Scalars["Int"];
  /** 平台資訊/自定義資訊 */
  info?: Maybe<Scalars["JSON"]>;
  /** 平台名稱 */
  name: Scalars["String"];
  projects: Array<Project>;
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
};

export type Project = {
  __typename?: "Project";
  auths: RolePermissionUserGroup;
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 項目描述 */
  description?: Maybe<Scalars["String"]>;
  enable: Scalars["Boolean"];
  /** 項目ID */
  id: Scalars["Int"];
  /** 項目資訊(自定義資訊) */
  info?: Maybe<Scalars["JSON"]>;
  /** 項目名稱 */
  name: Scalars["String"];
  platformId: Scalars["Int"];
  services: Array<Service>;
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
};

export type Query = {
  __typename?: "Query";
  /** 提取模組與相關權限 */
  allModulesPermissions: Array<Module>;
  /** 所有服務列表 */
  getAllServices: Array<Service>;
  /** 提取項目相關服務 */
  getProjectServices: Array<Service>;
  /** 單一組織資訊 */
  group: Group;
  /** 組織角色與權限 */
  groupRoleAndPermissions: RoleAndPermissions;
  /** 組織的nested資訊 */
  groups: Array<Group>;
  /** 提取平台資訊 */
  platform: Platform;
  /** 提取平台使用者及組織 */
  platformGroupsAndUser: UserAndGroup;
  /** 提取平台列表 */
  platforms: Array<Platform>;
  /** 提取單一項目資訊 */
  project: Project;
  /** 提取項目使用者及組織 */
  projectGroupsAndUser: UserAndGroup;
  /** 提取平台所有項目 */
  projects: Array<Project>;
  /** 提取角色資訊 */
  role: Role;
  /** 提取角色資訊 */
  roleUsersGroups: UserAndGroup;
  /** 提取平台角色權限 */
  roles: Array<Role>;
  /** 提取單一使用者資訊 */
  user: UserGroup;
  /** 使用者角色與權限 */
  userRoleAndPermissions: RoleAndPermissions;
  /** 提取平台所有使用者資訊 */
  users: Array<User>;
  /** Token是否合法 */
  validate: UserInfoInToken;
};

export type QueryAllModulesPermissionsArgs = {
  platformId: Scalars["Int"];
};

export type QueryGetProjectServicesArgs = {
  projectId: Scalars["Int"];
};

export type QueryGroupArgs = {
  id: Scalars["Int"];
};

export type QueryGroupRoleAndPermissionsArgs = {
  groupId: Scalars["Float"];
};

export type QueryGroupsArgs = {
  projectId: Scalars["Int"];
};

export type QueryPlatformArgs = {
  id: Scalars["Int"];
};

export type QueryPlatformGroupsAndUserArgs = {
  platformId: Scalars["Int"];
};

export type QueryProjectArgs = {
  projectId: Scalars["Int"];
};

export type QueryProjectGroupsAndUserArgs = {
  projectId: Scalars["Int"];
};

export type QueryProjectsArgs = {
  platformId?: InputMaybe<Scalars["Int"]>;
};

export type QueryRoleArgs = {
  roleId: Scalars["Int"];
};

export type QueryRoleUsersGroupsArgs = {
  projectId: Scalars["Int"];
  roleId: Scalars["Int"];
};

export type QueryRolesArgs = {
  projectId: Scalars["Int"];
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type QueryUserRoleAndPermissionsArgs = {
  userId: Scalars["Float"];
};

export type QueryUsersArgs = {
  platformId: Scalars["Int"];
};

export type Role = {
  __typename?: "Role";
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 角色描述 */
  description?: Maybe<Scalars["String"]>;
  /** 角色ID */
  id: Scalars["Int"];
  modules: Array<Module>;
  /** 角色名稱 */
  name: Scalars["String"];
  permissionEnableList: Array<PermissionLink>;
  /** 項目ID */
  projectId: Scalars["Int"];
  /** 系統管理自定義角色, 作為API提取範圍限制(管理者/內部/外部) */
  type: SystemRole;
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
};

export type RoleAndPermissions = {
  __typename?: "RoleAndPermissions";
  permissions: Array<PermissionLink>;
  roles: Array<RoleLink>;
};

export type RoleLink = {
  __typename?: "RoleLink";
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 角色描述 */
  description?: Maybe<Scalars["String"]>;
  /** 角色ID */
  id: Scalars["Int"];
  linkId: Scalars["Float"];
  modules: Array<Module>;
  /** 角色名稱 */
  name: Scalars["String"];
  permissionEnableList: Array<PermissionLink>;
  /** 項目ID */
  projectId: Scalars["Int"];
  /** 系統管理自定義角色, 作為API提取範圍限制(管理者/內部/外部) */
  type: SystemRole;
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
};

export type RoleLinks = {
  __typename?: "RoleLinks";
  /** 組織ID */
  groupId?: Maybe<Scalars["Int"]>;
  /** 關連角色ID */
  id: Scalars["Int"];
  /** 角色ID */
  roleId: Scalars["Int"];
  /** 使用者ID */
  userId?: Maybe<Scalars["Int"]>;
};

export type RolePermissionInput = {
  enable: Scalars["Boolean"];
  id: Scalars["Int"];
};

export type RolePermissionUserGroup = {
  __typename?: "RolePermissionUserGroup";
  permissions: Array<PermissionUserGroup>;
  roles: Array<RoleUserGroup>;
};

export type RoleUserGroup = {
  __typename?: "RoleUserGroup";
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 角色描述 */
  description?: Maybe<Scalars["String"]>;
  grouplinks: Array<RoleLinks>;
  /** 角色ID */
  id: Scalars["Int"];
  modules: Array<Module>;
  /** 角色名稱 */
  name: Scalars["String"];
  permissionEnableList: Array<PermissionLink>;
  /** 項目ID */
  projectId: Scalars["Int"];
  /** 系統管理自定義角色, 作為API提取範圍限制(管理者/內部/外部) */
  type: SystemRole;
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
  userlinks: Array<RoleLinks>;
};

export type Service = {
  __typename?: "Service";
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 微服務描述 */
  description?: Maybe<Scalars["String"]>;
  /** 啟用 */
  enable: Scalars["Boolean"];
  /** 微服務ID */
  id: Scalars["Int"];
  /** 微服務資訊/自定義資訊 */
  info?: Maybe<Scalars["JSON"]>;
  module: Array<Module>;
  /** 微服務名稱 */
  name: Scalars["String"];
  /** 微服務類型 */
  type: Type;
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
};

export enum SystemRole {
  Admin = "ADMIN",
  Guest = "GUEST",
  Member = "MEMBER",
}

export enum Type {
  Cesium = "CESIUM",
  Iot = "IOT",
  Ops = "OPS",
  Viewer = "VIEWER",
}

export type UpdateGroupInput = {
  /** 組織類別(各平台自定義) */
  category?: InputMaybe<Scalars["String"]>;
  /** 組織描述 */
  description?: InputMaybe<Scalars["String"]>;
  /** 組織顯示名稱 */
  displayName?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  /** 組識資訊 */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 組織名稱 */
  name?: InputMaybe<Scalars["String"]>;
  /** 上層組織ID */
  parentGroupId?: InputMaybe<Scalars["Int"]>;
  platformId?: InputMaybe<Scalars["Int"]>;
  projectId?: InputMaybe<Scalars["Int"]>;
};

export type UpdatePlatformInput = {
  /** 平台描述 */
  description?: InputMaybe<Scalars["String"]>;
  /** 平台ID */
  id?: InputMaybe<Scalars["Int"]>;
  /** 平台資訊/自定義資訊 */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 平台名稱 */
  name?: InputMaybe<Scalars["String"]>;
};

export type UpdateProjectInput = {
  /** 項目描述 */
  description?: InputMaybe<Scalars["String"]>;
  enable?: InputMaybe<Scalars["Boolean"]>;
  /** 項目ID */
  id?: InputMaybe<Scalars["Int"]>;
  /** 項目資訊(自定義資訊) */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 項目名稱 */
  name?: InputMaybe<Scalars["String"]>;
  platformId?: InputMaybe<Scalars["Int"]>;
};

export type UpdateServiceInput = {
  /** 微服務描述 */
  description?: InputMaybe<Scalars["String"]>;
  /** 啟用 */
  enable?: InputMaybe<Scalars["Boolean"]>;
  /** 微服務ID */
  id?: InputMaybe<Scalars["Int"]>;
  /** 微服務資訊/自定義資訊 */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 微服務名稱 */
  name?: InputMaybe<Scalars["String"]>;
  /** 微服務類型 */
  type?: InputMaybe<Type>;
};

export type UpdateUserInput = {
  /** 顯示名稱 */
  displayName?: InputMaybe<Scalars["String"]>;
  /** 使用者Email, 同一平台內不得重複 */
  email?: InputMaybe<Scalars["String"]>;
  /** 是否帳號停權 */
  enable?: InputMaybe<Scalars["Boolean"]>;
  /** 性別 */
  gender?: InputMaybe<Gender>;
  groupId?: InputMaybe<Scalars["Int"]>;
  id: Scalars["Int"];
  /** 此為平台自定義內容，依JSON形式儲存 */
  info?: InputMaybe<Scalars["JSON"]>;
  /** 使用者姓名 */
  name?: InputMaybe<Scalars["String"]>;
  /** 電話 */
  phone?: InputMaybe<Scalars["String"]>;
  platformId?: InputMaybe<Scalars["Int"]>;
};

export type User = {
  __typename?: "User";
  /** 管理層級 */
  admin: Admin;
  /** 頭像連結，依各平台狀況設定path */
  avatarPath?: Maybe<Scalars["String"]>;
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 顯示名稱 */
  displayName?: Maybe<Scalars["String"]>;
  /** 使用者Email, 同一平台內不得重複 */
  email: Scalars["String"];
  /** 是否帳號停權 */
  enable: Scalars["Boolean"];
  /** 性別 */
  gender: Gender;
  /** 使用者ID */
  id: Scalars["Int"];
  /** 此為平台自定義內容，依JSON形式儲存 */
  info?: Maybe<Scalars["JSON"]>;
  /** 使用者姓名 */
  name: Scalars["String"];
  /** 電話 */
  phone?: Maybe<Scalars["String"]>;
  platformId?: Maybe<Scalars["Int"]>;
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
};

export type UserAndGroup = {
  __typename?: "UserAndGroup";
  groups?: Maybe<Array<Group>>;
  users?: Maybe<Array<User>>;
};

export type UserGroup = {
  __typename?: "UserGroup";
  /** 管理層級 */
  admin: Admin;
  /** 頭像連結，依各平台狀況設定path */
  avatarPath?: Maybe<Scalars["String"]>;
  /** 資料創建時間 */
  createdAt?: Maybe<Scalars["Timestamp"]>;
  /** 顯示名稱 */
  displayName?: Maybe<Scalars["String"]>;
  /** 使用者Email, 同一平台內不得重複 */
  email: Scalars["String"];
  /** 是否帳號停權 */
  enable: Scalars["Boolean"];
  /** 性別 */
  gender: Gender;
  groups?: Maybe<Array<Group>>;
  /** 使用者ID */
  id: Scalars["Int"];
  /** 此為平台自定義內容，依JSON形式儲存 */
  info?: Maybe<Scalars["JSON"]>;
  /** 使用者姓名 */
  name: Scalars["String"];
  /** 電話 */
  phone?: Maybe<Scalars["String"]>;
  platformId?: Maybe<Scalars["Int"]>;
  /** 資料更新時間 */
  updatedAt?: Maybe<Scalars["Timestamp"]>;
};

export type UserInfoInToken = {
  __typename?: "UserInfoInToken";
  email: Scalars["String"];
  id: Scalars["Int"];
  platformId?: Maybe<Scalars["Int"]>;
  tokenInfo?: Maybe<TokenExpiry>;
};

export type TokenExpiry = {
  __typename?: "tokenExpiry";
  expiredAt: Scalars["String"];
  isValid: Scalars["Boolean"];
};
