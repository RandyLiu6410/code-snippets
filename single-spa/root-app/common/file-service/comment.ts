import { PageInfo } from 'common/page';
import { IUser } from 'common/user-service/user';

export interface IComment {
  id: string;
  clientId: string;
  fileId?: string;
  folderId?: string;
  content: string;
  senderId: string;
  timestamp: number;
  sender?: IUser;
}

export interface CommentNode {
  fileId?: string;
  folderId?: string;
  comments: (IComment & {
    sender: IUser;
  })[];
}
