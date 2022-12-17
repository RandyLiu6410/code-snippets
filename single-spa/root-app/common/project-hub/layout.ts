import { IProject } from './project';
import { IService } from './service';

export interface ILayout {
  id: number;
  name: string;
  projectId: number;
  menuId: number;
  width: string;
  height: string;
  parentLayoutId?: number;
  service: IService;
  info: object;
  project: IProject;
  layout: ILayout;
  children: ILayout[];
}
