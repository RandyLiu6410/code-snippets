import { IUser } from 'common/user-service/user';

export interface Notification {
  timestamp: number;
  type: 'Notify' | 'Status Update' | 'File Change' | 'Join Room';
  fileId?: string;
  caller?: IUser;
  room?: string;
}
