import { IFlowRecord } from "./flow-record";
import { FlowTimelineNode, INode } from "./node";

// Flow related
export type FlowStatus =
  | "DRAFT"
  | "ONGOING"
  | "REJECTED"
  | "ENDED"
  | "ARCHIVED";

// Node related
export type ApprovalType =
  | "ASSIGN_USER"
  | "SELF_SELECT"
  | "LEADER_TOP"
  | "LEADER"
  | "ROLE"
  | "SELF";

export type ApprovalMode = "AND" | "OR" | "NEXT";

export type TimeoutEvent = "PASS" | "REFUSE" | "NOTIFY";

export type TimeLimitType = "DAY" | "HOUR";

export type UserEmpty = "TO_PASS" | "TO_ADMIN" | "TO_USER";

export type EndCondition = "TOP" | "LEAVE";

export type Operation = "APPROVE" | "CC" | "REJECT" | "RETURN" | "RECALL";

export type CCType = "Notification" | "Mail" | "Both";

export interface CanSubmit {
  type: "group" | "user";
  key: string;
  id: number;
  name: string;
  displayName: string;
  avatarPath?: string;
}

export interface Platform {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface StoreToInfo {
  data?: {
    id: string;
  };
  url?: string;
}

export interface StoreTo {
  type: string;
  info: StoreToInfo;
}

export interface ccBody {
  to: string;
  subject: string;
  text: string;
  template: string;
  context: {
    flow_name: string;
    flow_config_name: string;
  };
}

export interface IFlow {
  id: string;
  clientId: string;
  categoryId?: string;
  startTime: number;
  deadline: number;
  name: string;
  description: string;
  status: FlowStatus;
  submitterId: string;
  waitingNodeList?: INode[];
  configId?: string;
  storeAttachmentTo: StoreTo;
  ccType: CCType;
  fileIdx?: string[];
  formAnswerId?: string;
}

export interface FlowResponse extends IFlow {
  submitter?: any;
  // for specific user
  userCanOperate?: boolean; // approve/ reject
  record?: IFlowRecord;
  innerData?: FlowResponse[];
}

export interface FlowNodesResponse {
  timelineNodes: FlowTimelineNode[];
  waitingNodeList: INode[];
}

import { PageInfo } from "common/page";

export interface FlowPage extends PageInfo {
  docs: FlowResponse[];
}
