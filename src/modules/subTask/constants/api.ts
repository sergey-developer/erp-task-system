export enum SubTaskEndpointEnum {
  GetSubTaskTemplateList = '/catalogs/templates/',
  GetSubTaskList = '/tasks/:id/subtasks/',
  CreateSubTask = '/tasks/:id/subtasks/',
  CancelSubTask = '/subtasks/:id/cancel/',
  ReworkSubTask = '/subtasks/:id/rework/',
}

export enum SubTaskEndpointNameEnum {
  GetSubTaskList = 'getSubTaskList',
  GetSubTaskTemplateList = 'getSubTaskTemplateList',
  CreateSubTask = 'createSubTask',
  CancelSubTask = 'cancelSubTask',
  ReworkSubTask = 'reworkSubTask',
}
