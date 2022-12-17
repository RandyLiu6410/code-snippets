export interface IUser {
  id: string;
  displayName: string;
  avatar?: string;
  email?: string;
}

export interface IGroup {
  id: string;
  displayName: string;
  users: IUser[];
  children: IGroup[];
}
