import { IUser } from "common/user-service/user";
import { Operation } from "./flow";
import { INode } from "./node";

export interface FlowRecordInfo {
  toId?: string;
  toEmail?: string;
}

export interface IFlowRecord {
  id: string;
  clientId: string;
  flowId: string;
  nodeId?: string;
  toNodeId?: string;
  operation: Operation;
  timestamp: number;
  callerId?: string;
  notes?: string;
  info?: FlowRecordInfo;
  node?: INode;
  toNode?: INode;
}

export interface RecordNode {
  flowId: string;
  records: (IFlowRecord & {
    info?: FlowRecordInfo & {
      to?: IUser;
    };
  } & {
    caller: IUser;
  })[];
}
