import { PageInfo } from 'common/page';
import { IUser } from 'common/user-service/user';

export type Operation =
  | 'Create'
  | 'Upload'
  | 'Update'
  | 'Open'
  | 'Delete'
  | 'Restore'
  | 'PermanentlyDelete';

export interface RecordInfo {
  toId?: string;
  toEmail?: string;
}

export interface RecordNode {
  fileId?: string;
  folderId?: string;
  records: (IRecord & {
    info?: RecordInfo & {
      to?: IUser;
    };
  } & {
    caller?: IUser;
  })[];
}

export interface IRecord {
  id: string;
  clientId: string;
  fileId?: string;
  folderId?: string;
  operation: Operation;
  timestamp: number;
  callerId: string;
  notes?: string;
  info?: RecordInfo & {
    to?: IUser;
  };
  caller?: IUser;
}
