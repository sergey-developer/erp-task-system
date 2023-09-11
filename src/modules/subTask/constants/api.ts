export enum SubTaskApiEnum {
  //
  GetSubTaskList = '/tasks/:id/subtasks/',
  CreateSubTask = '/tasks/:id/subtasks/',

  CancelSubTask = '/subtasks/:id/cancel/',
  ReworkSubTask = '/subtasks/:id/rework/',
}

export enum SubTaskApiTriggerEnum {
  //
  GetSubTaskList = 'getSubTaskList',
  CreateSubTask = 'createSubTask',

  CancelSubTask = 'cancelSubTask',
  ReworkSubTask = 'reworkSubTask',
}
