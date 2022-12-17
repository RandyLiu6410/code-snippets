export interface ICoordinate {
  latitude: number;
  longitude: number;
}

export interface IAddress {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  country: string;
  postcode: string;
}

export interface IUserServiceInfo {
  platformId: number;
  projectId: number;
}

export interface IProject {
  id: number;
  name: string;
  owner: string;
  imagePath: string;
  thumbnailPath: string;
  serialNo: string;
  phone: string;
  fax: string;
  description: string;
  startDate: Date;
  endDate: Date;
  cost: number;
  address: IAddress;
  coordinate: ICoordinate;
  squareMeter: number;
  userServiceInfo: IUserServiceInfo;
}
