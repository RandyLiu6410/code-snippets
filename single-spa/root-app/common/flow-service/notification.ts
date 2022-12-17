import { IUser } from "common/user-service/user";
import { IFlow } from "./flow";
import { INode } from "./node";

export interface INotification {
  timestamp: number;
  type: "Notify" | "Status Update";
  flow?: Partial<IFlow>;
  node?: Partial<INode>;
  caller?: IUser;
  to?: Partial<IUser>;
}
