import { IGroup, IUser } from "common/user-service/user";
import {
  ApprovalMode,
  ApprovalType,
  TimeLimitType,
  TimeoutEvent,
  UserEmpty,
  EndCondition,
} from "./flow";
import { FormItemValueType } from "common/form-service";

export type NodeStatus = "ONGOING" | "PASSED";

export type NodeType =
  | "REVIEW"
  | "CC"
  | "CONDITIONS"
  | "CONDITION"
  | "ROOT"
  | "EMPTY"
  | "PARALLEL";

export interface TimeLimit {
  type: TimeLimitType;
  limit: number;
  event: {
    type: TimeoutEvent;
    loop: boolean;
    loopTime: number;
  };
}

export interface obj {
  type: "group" | "user";
  id: string;
  pass: boolean;
}

export interface TargetObj {
  multiple: boolean;
  roles: any[];
  objs: (obj & (IUser | IGroup))[];
  emails: string[];
}

export type ConditionCompare =
  | "="
  | ">"
  | ">="
  | "<"
  | "<="
  | "IN"
  | "B"
  | "AB"
  | "BA"
  | "ABA";
type FormItemValueTypeKeys = keyof typeof FormItemValueType;
type FormItemValueTypeValues = typeof FormItemValueType[FormItemValueTypeKeys];

export interface GroupCondition {
  id: string;
  valueType: FormItemValueTypeValues;
  title: string;
  value: string[] | { name: string }[];
  compare: ConditionCompare;
}

export interface Group {
  groupType: "AND" | "OR";
  cids: any[];
  conditions: GroupCondition[];
}

export interface Props {
  type: ApprovalType;
  mode: ApprovalMode;
  timeLimit: TimeLimit;
  sign: boolean;
  userEmpty: UserEmpty;
  leaderLevel: number;
  endCondition: EndCondition;
  targetObj: TargetObj;
  canEdit: boolean;
  canReturn: boolean;
  canReturnToAny: boolean;
  canReturnToIdx: string[];
  canRecall: boolean;
  canReject: boolean;
  allowEmpty: boolean;
  groupsType: "AND" | "OR";
  groups: Group[];
}

export interface INode {
  id: string;
  flowId?: string;
  type: NodeType;
  pid?: string;
  name?: string;
  props?: Props;
  nextNodeId?: string;
  parallelNodeIdx?: string[];
  conditionNodeIdx?: string[];
  nodeStatus?: NodeStatus;
  info?: any;
}

export interface INodeResponse extends INode {
  pass?: boolean;
}

export interface FlowTimelineNode extends Partial<INode> {
  pass?: boolean;
}
