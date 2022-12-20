export enum SubTaskEndpointsEnum {
  GetSubTaskTemplateList = '/catalogs/templates',
  GetSubTaskList = '/tasks/:id/subtasks',
  CreateSubTask = '/tasks/:id/subtasks',
  CancelSubTask = '/subtasks/:id/cancel',
  ReworkSubTask = '/subtasks/:id/rework',
}
