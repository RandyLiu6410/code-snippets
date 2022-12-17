import { IFolder } from './folder';
import { ILabel } from './label';
import { Rule } from './naming-rule';
import { ITag } from './tag';

export interface IFsObject {
  value: string;
  id: string;
  size: number;
  date: number;
  type: string;
  data?: IFsObject[];
}

export interface BucketItem {
  name: string;
  prefix?: string;
  size: number;
  etag: string;
  lastModified: Date;
  isLatest?: boolean;
  isDeleteMarker?: boolean;
}

export interface BucketItemMetadata {
  dbId: string;
}

export interface IBucketItem extends BucketItem {
  versionCount?: number;
  versionId?: string;
  versions?: string[];
}

export interface IIFsObject extends IFsObject {
  minio?: IBucketItem;
  external?: IFile | IFolder;
  star?: boolean;
}

export interface FileManager {
  readyFiles: IFile[];
  unreadyFiles: IFile[];
}

export interface RuleProp {
  id: string;
  rule?: Rule;
  value: string;
}

export type fileType = 'file' | 'osheet' | 'oword' | 'oform';

export type sourceType = 'files' | 'favorite' | 'recent' | 'trash' | 'shared';

export interface IFile {
  id: string;
  clientId: string;
  fid: string;
  folderId: string;
  name: string;
  tags: ITag[];
  tagIdx: string[];
  label: ILabel;
  labelId?: string;
  uploaderId?: string;
  sources: sourceType[];
  ruleProps: RuleProp[];
  ruleReady: boolean;
  versions: string[];
  uploaderIdx: string[];
  isTemplate?: boolean;
  info?: object;
}

import { PageInfo } from 'common/page';

export interface FilePage extends PageInfo {
  docs: IFile[];
}

export interface IIFsObjectPage extends PageInfo {
  docs: IIFsObject[];
}
