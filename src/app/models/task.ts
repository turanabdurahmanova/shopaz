export interface Task {
  id?: number;
  name?: string;
  typeID?: number;
  priorityID?: number;
  stageID?: number;
  description?: string;
  isDeleted?: string;
  userId?: number;
  priority_name?: string;
  task_type_name?: string;
  stage_name?: string;
  username?: string;
}

export interface TaskType {
  id: number;
  name: string;
}

export interface CreateTaskModel {
  taskName: string;
  description: string;
  typeId: number;
  priorityId: number;
  userId: number;
  stageId: number;
}

export interface SpecificTask {
  id: number;
  name: string;
  typeID: number;
  priorityID: number;
  stageID: number;
  description: string;
  isDeleted: boolean;
  userId: number;
  priority_name: string;
  task_type_name: string;
  stage_name: string;
  username: string;
}

export interface UpdateTaskModel {
  taskName: string;
  typeId: number;
  taskId: number;
  priorityId: number;
  userId: number;
  description: string;
}
