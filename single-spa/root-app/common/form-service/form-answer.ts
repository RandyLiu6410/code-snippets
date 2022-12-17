import { IUser } from 'common/user-service/user';

export interface IFormAnswerItem {
  itemId: string;
  value?: string | string[];
}

export interface IFormAnswer {
  id: string;
  formId: string;
  items: IFormAnswerItem[];
  submitterId?: string;
  submitter?: IUser | any;
}

export interface FormAnswerResponse extends IFormAnswer {
  submitter?: IUser;
}

import { PageInfo } from 'common/page';

export interface FormAnswerPage extends PageInfo {
  docs: FormAnswerResponse[];
}
