import { CanSubmit, StoreTo } from "./flow";
import { Group, GroupCondition } from "./node";

export interface IFlowConfig {
  id: string;
  clientId: string;
  isTemplate: boolean;
  name: string;
  description: string;
  whoCanSubmit: CanSubmit[];
  nodeIdx: string[];
  ownerId?: string;
  formFile?: StoreTo;
  conditionGroups: Group[];
  canEdit: boolean;
}

import { PageInfo } from "common/page";

export interface FlowConfigPage extends PageInfo {
  docs: IFlowConfig[];
}
