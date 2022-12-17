import { RuleProp, sourceType } from "./file";
import { ILabel } from "./label";
import { ITag } from "./tag";

export interface IFolder {
  id: string;
  clientId: string;
  pid: string;
  fid: string;
  name: string;
  subFolderIdx: string[];
  tags: ITag[];
  tagIdx: string[];
  label: ILabel;
  labelId?: string;
  uploaderId?: string;

  sources: sourceType[];
  namingRuleId?: string;
  notAllowRename?: boolean;
  notAllowDelete?: boolean;
  notAllowManuallyUpload?: boolean;
  ruleProps: RuleProp[];
  ruleReady: boolean;

  minioId: string;
}
