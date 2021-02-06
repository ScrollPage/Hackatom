import { ITask } from "./task";

export interface IDiagram {
  id: number;
  tasks: ITask[];
  is_initiator: boolean;
  is_admin: boolean;
}