import { IUser } from "common/user-service/user";
import { INode } from "./node";

export interface AttachmentInfo {
  data?: {
    id: string;
  };
  url?: string;
}

export interface IAttachment {
  id: string;
  flowId: string;
  nodeId: string;
  name: string;
  info: AttachmentInfo;
  uploaderId: string;
}

export interface AttachmentNode extends Partial<INode> {
  attachments: (IAttachment & {
    uploader: IUser;
  })[];
}
