import { IProject } from './project';

export interface IChannel {
  id: number;
  name: string;
  projectId: number;
  project: IProject;
}
