export enum ServiceName {
  ViewerService = 'ViewerService',
  MapService = 'MapService',
  FileService = 'FileService',
  UserService = 'UserService',
  FlowService = 'FlowService',
  FormService = 'FormService',
}

export interface IService {
  name: ServiceName;
  path: string;
  params: object;
  query: object;
  useModule: string;
  info: object;
}
