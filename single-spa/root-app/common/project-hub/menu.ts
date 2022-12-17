import { IChannel } from './channel';
import { ILayout } from './layout';
import { IProject } from './project';

export enum MenuType {
  Group = 'Group',
  Page = 'Page',
}

export interface IMenu {
  id: number;
  name: string;
  type: MenuType;
  parentMenuId?: number;
  layoutId?: number;
  projectId: number;
  channelId?: number;
  order: number;
  visible: boolean;
  layout?: ILayout;
  channel?: IChannel;
  project: IProject;
  menu?: IMenu;
}
