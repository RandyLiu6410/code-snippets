export type USER_SOURCE_TYPE = "user-service" | "standalone";

export type FILE_SOURCE_TYPE = "file-service" | "standalone";

export type LOG_SOURCE_TYPE = "elastic-search" | "standalone";

export interface UserSource {
  type: USER_SOURCE_TYPE;
  url: string;
}

export interface FileSource {
  type: FILE_SOURCE_TYPE;
  url: string;
  info?: {
    clientId?: string;
  };
}

export interface LogSource {
  type: LOG_SOURCE_TYPE;
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
  file_source?: FileSource;
  log_source?: LogSource;
  info?: ClientInfo;
}
