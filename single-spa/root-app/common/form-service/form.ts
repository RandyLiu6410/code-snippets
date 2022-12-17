export type FormTheme = 'LIGHT' | 'DARK';

export type FormFontSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export interface IForm {
  id: string;
  clientId: string;
  fileId: string;
  itemIdx: string[];
  title: string;
  description: string;
  theme: FormTheme;
  fontSize: FormFontSize;
  published: boolean;
  canRepeatSubmit: boolean;
  ownerId: string;
}

import { IUser } from 'common/user-service/user';
export interface FormResponse extends IForm {
  owner?: IUser;
}

import { PageInfo } from 'common/page';

export interface FormPage extends PageInfo {
  docs: FormResponse[];
}
