import { Task } from "./task";

export interface Stage {
  id: number;
  name: string;
  tasks: Array<Task>;
}
