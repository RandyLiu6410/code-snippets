export type USER_SOURCE_TYPE = "user-service" | "standalone";

export interface UserSource {
  type: USER_SOURCE_TYPE;
  url: string;
}

export interface ClientInfo {
  platformId?: string;
  projectId?: string;
}

export interface IClient {
  id: string;
  alias: string;
  user_source?: UserSource;
  info?: ClientInfo;
}
