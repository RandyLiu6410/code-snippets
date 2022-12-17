export type USER_SOURCE_TYPE = "user-service" | "standalone";

export interface ClientInfo {
  platformId?: string;
  projectId?: string;
  rootFolderId?: string;
  componentFolderId?: string;
  templateFolderId?: string;
}

export interface UserSource {
  type: USER_SOURCE_TYPE;
  url: string;
}

export interface IClient {
  id: string;
  alias: string;
  user_source?: UserSource;
  bucketName: string;
  info?: ClientInfo;
}
