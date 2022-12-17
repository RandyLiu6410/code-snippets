import { PageInfo } from 'common/page';
import { IUser } from 'common/user-service/user';
import { fileType, IIFsObject } from './file';

export interface CategoryRowField {
  name: string;
  value: string;
  link?: string;
}

export interface ICategoryRow {
  id: string;
  clientId: string;
  categoryId: string;
  fileType?: fileType;
  fileId: string;
  fields: CategoryRowField[];
  file?: IIFsObject;
  uploader?: IUser;
}
