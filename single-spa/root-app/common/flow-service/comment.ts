import { IUser } from "common/user-service/user";

export interface IComment {
  id: string;
  flowId: string;
  nodeId: string;
  content: string;
  senderId: string;
  timestamp: number;
}

export interface CommentNode {
  flowId: string;
  comments: (IComment & {
    sender: IUser;
  })[];
}
